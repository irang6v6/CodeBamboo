import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';
import { Repository, Like, Equal } from 'typeorm';
import { UpdateUserDto } from './dto/update.user.dto';
import { SimpleUserDto } from './dto/simple.user.dto';
import { CreateFollowDto } from './dto/create.follow.dto';
import { GetUserDto } from './dto/get.user.dto';
import { MessageUserDto } from './dto/message.user.dto';
import { Bookmark } from './entities/bookmark.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';
import { LikeEntity } from './entities/like.entity';
import { transformUserTopics, searchBestLeafId } from './utils/utils';
import { getUserTopicsDTO } from './dto/get.userTopics.dto';
import { Topic } from 'src/topics/entities/topic.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,

    @Inject('FOLLOW_REPOSITORY')
    private followRepository: Repository<Follow>,

    @Inject('BOOKMARK_REPOSITORY')
    private bookmarkRepository: Repository<Bookmark>,

    @Inject('LEAF_REPOSITORY')
    private leafRepository: Repository<Leaf>,

    @Inject('LIKE_REPOSITORY')
    private likeRepository: Repository<LikeEntity>,

    @Inject('TOPIC_REPOSITORY')
    private topicRepository: Repository<Topic>,
  ) {}

  // [#] 테스트용 코드
  async getAll(): Promise<SimpleUserDto[]> {
    return this.userRepository.find();
  }

  // [1] 유저 nickname으로 정보 조회
  // myUserId가 전달인자로 포함되어야함
  async searchUsersNickname(userInput: string): Promise<GetUserDto[]> {
    const users = await this.userRepository.find({
      where: { nickname: Like(`%${userInput}%`) },
    });
    if (!users) {
      throw new NotFoundException(`user nickname ${userInput} not found`);
    }
    return users.map((obj) => {
      const getUserDto = {
        user_id: obj.user_id,
        nickname: obj.nickname,
        image: obj.image,
        introduce: obj.introduce,
        email: obj.email,
        isDeleted: obj.isDeleted,
        // isFollowed: await this.isFollowerUser(myUserId, obj.user_id),
      };
      return getUserDto;
    });
  }

  // [2 - 1] 유저Id로 팔로우 목록 조회
  // myUserId가 전달인자로 포함되어야함
  async getFollowUsers(id: number): Promise<GetUserDto[]> {
    const existedUser = await this.getUser(id);
    if (existedUser) {
      const users = await this.userRepository.findOne({
        where: {
          user_id: id,
        },
        relations: {
          followings: true,
        },
      });
      return users.followings.map((obj) => {
        const followedUser = {
          user_id: obj.followed.user_id,
          nickname: obj.followed.nickname,
          image: obj.followed.image,
          introduce: obj.followed.introduce,
          email: obj.followed.email,
          isDeleted: obj.followed.isDeleted,
          // isFollowed: await this.isFollowerUser(myUserId, obj.followed.user_id),
        };
        return followedUser;
      });
    }
  }

  // [2 - 2] 내가 팔로우한 사람인지 아닌지 판별
  async isFollowUser(myUserId: number, targetUserId: number): Promise<boolean> {
    const existedMyUserId = await this.getUser(myUserId);
    if (existedMyUserId) {
      const myFollowUsers = await this.getFollowUsers(targetUserId);
      for (let i = 0; i < myFollowUsers.length; i++) {
        if (myFollowUsers[i].user_id === targetUserId) {
          return true;
        }
      }
    }
    return false;
  }

  // [3] 팔로우 생성
  async followUser(createFollowDto: CreateFollowDto): Promise<MessageUserDto> {
    const existedUserA = await this.getUser(createFollowDto.userId);
    const existedUserB = await this.getUser(createFollowDto.followUserId);
    if (existedUserA && existedUserB) {
      const follow = await this.followRepository.findBy({
        following: Equal(createFollowDto.userId),
        followed: Equal(createFollowDto.followUserId),
      });
      const messageUserDto = new MessageUserDto();
      if (follow.length <= 0) {
        // 없는 관계면 생성
        await this.followRepository.save({
          following: existedUserA,
          followed: existedUserB,
        });
        messageUserDto.message = `${existedUserB.nickname}님을 팔로우했어요 !`;
        return messageUserDto;
      } else {
        // 이미 있는 관계면 삭제
        await this.followRepository.delete(follow[0].follow_id);
        messageUserDto.message = `${existedUserB.nickname}님을 언팔로우했어요 !`;
        return messageUserDto;
      }
    }
  }

  // [4] 특정 유저가 작성한 모든 토픽 조회
  async getUserTopics(userId: number): Promise<getUserTopicsDTO> {
    const existedUser = await this.getUser(userId);
    if (!existedUser) throw new NotFoundException('존재하지 않는 유저입니다.'); // 에러타입이랑 메세지 알맞게 바꿔주셈

    const user = await this.userRepository.findOne({
      where: {
        user_id: userId,
      },
      // 여기 업데이트 해서, 토픽의 리프, 리프의 코드 싹 가져옴
      relations: ['topics', 'topics.leafs', 'topics.leafs.codes'],
    });

    // DTO에 맞게 찜찜
    const data = transformUserTopics(user.topics);
    return {
      message: '유저 토픽 조회 성공',
      data,
    };
  }

  // [5] 특정 유저가 작성한 모든 리프 조회
  // myUserId가 전달인자로 추가되어야함
  async getUserLeafs(userId: number) {
    const existedUser = await this.getUser(userId);
    if (existedUser) {
      const user = await this.userRepository.findOne({
        where: {
          user_id: userId,
        },
        relations: {
          leafs: true,
        },
      });
      const userLeafs = user.leafs.map((obj) => {
        return {
          ...obj,
          user: {
            user_id: obj.user.user_id,
            nickname: obj.user.nickname,
            image: obj.user.image,
            isDeleted: obj.user.isDeleted,
            // isFollowed: await this.isFollowerUser(myUserId, obj.user.user_id),
          },
        };
      });
      for (let i = 0; i < userLeafs.length; i++) {
        const leaf = await this.leafRepository.findOne({
          where: { leaf_id: userLeafs[i].leaf_id },
          relations: { codes: true },
          loadEagerRelations: false,
        });
        console.log(leaf);
        userLeafs[i].codes = leaf.codes;
      }
      return userLeafs;
    }
  }

  // [6] 특정 유저가 즐겨찾기한 리프 조회
  async getBookmarkLeafs(userId: number) {
    const existedUser = await this.getUser(userId);
    if (existedUser) {
      const userBookmark = await this.userRepository.findOne({
        where: {
          user_id: userId,
        },
        relations: {
          bookmarks: true,
        },
      });

      const bookmarkList = userBookmark.bookmarks.map((obj) => {
        return {
          bookmark_id: obj.bookmark_id,
          user_id: obj.user.user_id,
          leaf: obj.leaf,
          codes: obj.leaf.codes,
        };
      });

      for (let i = 0; i < bookmarkList.length; i++) {
        const leaf = await this.leafRepository.findOne({
          where: { leaf_id: bookmarkList[i].leaf.leaf_id },
          relations: { codes: true },
          loadEagerRelations: false,
        });
        console.log(leaf);
        bookmarkList[i].leaf = leaf;
      }
      return bookmarkList;
    }
  }

  // [7] 즐겨찾기 추가 및 제거
  async addBookmarkLeaf(userId: number, leafId: number) {
    const existedUser = await this.getUser(userId);
    const existedLeaf = await this.leafRepository.findOne({
      where: { leaf_id: leafId },
    });
    if (!existedLeaf) {
      throw new NotFoundException('없는 리프 아이디 입니다.');
    }
    if (existedUser && existedLeaf) {
      const bookmark = await this.bookmarkRepository.findBy({
        user: Equal(userId),
        leaf: Equal(leafId),
      });
      const messageUserDto = new MessageUserDto();
      if (bookmark.length <= 0) {
        // 없는 관계면 생성
        await this.bookmarkRepository.save({
          user: existedUser,
          leaf: existedLeaf,
        });
        messageUserDto.message = `${existedLeaf.leaf_id}번 리프 즐겨찾기 등록 성공`;
        return messageUserDto;
      } else {
        // 이미 있는 관계면 삭제
        await this.bookmarkRepository.delete(bookmark[0].bookmark_id);
        messageUserDto.message = `${existedLeaf.leaf_id}번 리프 즐겨찾기 삭제 성공`;
        return messageUserDto;
      }
    }
  }

  // [8] 리프 좋아요 추가 및 삭제
  async addLikeLeaf(userId: number, leafId: number) {
    const existedUser = await this.getUser(userId);
    const existedLeaf = await this.leafRepository.findOne({
      where: { leaf_id: leafId },
      relations: ['topic'],
    });
    if (!existedLeaf) {
      throw new NotFoundException('없는 리프 입니다.');
    }

    if (existedUser && existedLeaf) {
      const likeItem = await this.likeRepository.findOne({
        where: {
          user: { user_id: userId },
          leaf: { leaf_id: leafId },
        },
      });
      const messageUserDto = new MessageUserDto();
      if (!likeItem) {
        // 없는 관계면 생성
        await this.likeRepository.save({
          user: { user_id: userId },
          leaf: { leaf_id: leafId },
        });
        messageUserDto.message = `${existedLeaf.leaf_id}번 리프 좋아요 등록 성공`;
      } else {
        // 이미 있는 관계면 삭제
        await this.likeRepository.delete(likeItem.like_id);
        messageUserDto.message = `${existedLeaf.leaf_id}번 리프 좋아요 삭제 성공`;
      }

      // 좋아요를 누른 리프의 토픽의 손들기 확인
      if (!(await existedLeaf.topic.needHelp)) {
        // 좋아요를 누른 리프의 토픽 찾기
        const topicItem = await this.topicRepository.findOne({
          where: { topic_id: existedLeaf.topic.topic_id },
          relations: ['leafs', 'leafs.likes'],
          loadRelationIds: {
            relations: ['leafs.likes'],
          },
        });
        // 찾은 토픽의 모든 리프들의 좋아요 수를 비교
        // 가장 좋아요수가 높은 리프의 leaf_id값을 반환
        const bestLeafId = searchBestLeafId(topicItem.leafs);

        // 토픽의 best_leaf_id 갱신
        this.topicRepository.update(topicItem.topic_id, {
          bestLeaf: { leaf_id: bestLeafId },
        });
      }

      return messageUserDto;
    }
  }

  // [9] 유저 id로 정보 조회
  // myUserId가 전달인자로 추가되어야함
  async getUser(id: number): Promise<GetUserDto> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`user id ${id} not found`);
    }
    // [2-2]를 호출하여 내가 팔로우한 유저인지 아닌지 확인한 값을 추가
    // user.isfollowed = await this.isFollowUser(myUserId, id)
    return user;
  }

  // [10] 유저 삭제
  async deleteOne(id: number): Promise<void> {
    const user = await this.getUser(id);
    if (user) {
      await this.userRepository.delete(id);
    }
  }

  // [11] 유저 정보 수정
  // 닉네임, 이미지경로, 자기소개만 수정 가능
  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const simpleUserDto = await this.getUser(id);
    if (simpleUserDto) {
      await this.userRepository.update(id, {
        nickname: updateUserDto.nickname
          ? updateUserDto.nickname
          : simpleUserDto.nickname,
        image: updateUserDto.image ? updateUserDto.image : simpleUserDto.image,
        introduce: updateUserDto.introduce
          ? updateUserDto.introduce
          : simpleUserDto.introduce,
      });
    }
  }
}
