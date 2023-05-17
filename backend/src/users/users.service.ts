import { User } from 'src/users/entities/user.entity';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Follow } from './entities/follow.entity';
import { Repository, Like, Equal } from 'typeorm';
import { SimpleUserDto } from './dto/simple.user.dto';
import { MessageUserDto } from './dto/message.user.dto';
import { Bookmark } from './entities/bookmark.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';
import { LikeEntity } from './entities/like.entity';
import { searchBestLeafId } from './utils/utils';
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

  // [1] 유저 nickname으로 정보 조회 ok
  async searchUsersNickname(userInput: string) {
    const searchUsers = await this.userRepository.find({
      where: { nickname: Like(`%${userInput}%`) },
    });
    return searchUsers;
  }

  // [2] 유저Id로 팔로우 목록 조회 ok
  async getFollowUsers(userId: number) {
    const existedUser = await this.isExistedUser(userId);
    if (existedUser) {
      const followings = await this.followRepository.find({
        where: {
          following: { user_id: userId },
        },
      });
      for (let i = 0; i < followings.length; i++) {
        const followersCnt = await this.followRepository.count({
          where: {
            followed: { user_id: followings[i].followed.user_id },
          },
        });
        followings[i].followed['followersCnt'] = followersCnt;
      }
      return followings.map((followingUser) => followingUser.followed);
    }
  }

  // [3] 팔로우 생성 ok
  async followUser(myUserId: number, userId: number): Promise<MessageUserDto> {
    const existedUserA = await this.isExistedUser(myUserId);
    const existedUserB = await this.isExistedUser(userId);
    if (existedUserA && existedUserB) {
      const follow = await this.followRepository.findOneBy({
        following: { user_id: myUserId },
        followed: { user_id: userId },
      });
      const messageUserDto = new MessageUserDto();
      if (!follow) {
        // 없는 관계면 생성
        await this.followRepository.save({
          following: { user_id: myUserId },
          followed: { user_id: userId },
        });
        messageUserDto.message = `${existedUserB.nickname}님을 팔로우했어요 !`;
        return messageUserDto;
      } else {
        // 이미 있는 관계면 삭제
        await this.followRepository.delete(follow.follow_id);
        messageUserDto.message = `${existedUserB.nickname}님을 언팔로우했어요 !`;
        return messageUserDto;
      }
    }
    return new MessageUserDto();
  }

  // [3-2] 내가 팔로우한 사람인지 아닌지 판별
  async isFollowUser(myUserId: number, userId: number): Promise<boolean> {
    if (myUserId === userId) return null;
    return !!(await this.followRepository.findOneBy({
      following: { user_id: myUserId },
      followed: { user_id: userId },
    }));
  }

  // [4] 특정 유저가 작성한 모든 토픽 조회 ok
  async getUserTopics(userId: number) {
    await this.isExistedUser(userId);
    const topics = await this.topicRepository.find({
      where: {
        user: { user_id: userId },
      },
      relations: [
        'bestLeaf',
        'rootLeaf',
        'bestLeaf.codes',
        'rootLeaf.codes',
        'bestLeaf.user',
        'rootLeaf.user',
      ],
      loadEagerRelations: false,
    });
    return topics;
  }

  // [5] 특정 유저가 작성한 모든 리프 조회 ok
  async getUserLeafs(userId: number) {
    const existedUser = await this.isExistedUser(userId);
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
          user: userId,
        };
      });
      for (let i = 0; i < userLeafs.length; i++) {
        const leaf = await this.leafRepository.findOne({
          where: { leaf_id: userLeafs[i].leaf_id },
          relations: { codes: true },
        });
        userLeafs[i].codes = leaf.codes;
      }
      return userLeafs;
    }
  }

  // [6] 특정 유저가 즐겨찾기한 리프 조회 ok
  async getBookmarkLeafs(userId: number) {
    const existedUser = await this.isExistedUser(userId);
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
          loadEagerRelations: true,
        });
        bookmarkList[i].leaf = leaf;
      }
      return bookmarkList;
    }
  }

  // [7] 즐겨찾기 추가 및 제거 ok
  async addBookmarkLeaf(userId: number, leafId: number) {
    const existedUser = await this.isExistedUser(userId);
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

  // [8] 리프 좋아요 추가 및 삭제 ok
  async addLikeLeaf(userId: number, leafId: number) {
    const existedUser = await this.isExistedUser(userId);
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

  // [9] 유저 id로 정보 조회 ok
  async getUser(myUserId: number, userId: number) {
    const user = await this.isExistedUser(userId);
    // isFollow
    const isFollow = myUserId
      ? await this.isFollowUser(myUserId, userId)
      : null;

    // cnt
    const followersCnt = await this.followRepository.count({
      where: { followed: { user_id: userId } },
    });
    const topicsCnt = await this.topicRepository.count({
      where: { user: { user_id: userId } },
    });
    const leafsCnt = await this.leafRepository.count({
      where: { user: { user_id: userId } },
    });
    const bookmarksCnt = await this.bookmarkRepository.count({
      where: { user: { user_id: userId } },
    });
    return {
      ...user,
      isFollow,
      followersCnt,
      topicsCnt,
      leafsCnt,
      bookmarksCnt,
    };
  }

  // [9-2] 유효한 유저 아이디인지 확인 ok
  async isExistedUser(userId: number) {
    const isExistedUser = await this.userRepository.findOneBy({
      user_id: userId,
    });
    if (!isExistedUser)
      throw new NotFoundException(`user id ${userId} not found`);
    return isExistedUser;
  }

  // [10] 유저 정보 수정 ok
  // 닉네임, 이미지경로, 자기소개만 수정 가능
  async update(userId: number, userInput: any) {
    const user = await this.isExistedUser(userId);
    if (user) {
      await this.userRepository.update(userId, {
        nickname: userInput.nickname ? userInput.nickname : user.nickname,
        image: userInput.image ? userInput.image : user.image,
        introduce: userInput.introduce ? userInput.introduce : user.introduce,
      });
      return this.isExistedUser(userId);
    }
  }

  // 유저 삭제
  // async deleteOne(id: number): Promise<void> {
  //   const user = await this.getUser(id);
  //   if (user) {
  //     await this.userRepository.delete(id);
  //   }
  // }
}
