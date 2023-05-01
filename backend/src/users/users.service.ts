import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';
import { Repository, Like, Equal } from 'typeorm';
import { UpdateUserDto } from './dto/update.user.dto';
import { SimpleUserDto } from './dto/simple.user.dto';
import { CreateFollowDto } from './dto/create.follow.dto';
import { GetUserDto } from './dto/get.user.dto';
import { MessageUserDto } from './dto/message.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,

    @Inject('FOLLOW_REPOSITORY')
    private followRepository: Repository<Follow>,
  ) {}

  // [#] 테스트용 코드
  async getAll(): Promise<SimpleUserDto[]> {
    return this.userRepository.find();
  }

  // [1] 유저 nickname으로 정보 조회
  async searchUsersNickname(userInput: string): Promise<SimpleUserDto[]> {
    const users = await this.userRepository.find({
      where: { nickname: Like(`%${userInput}%`) },
    });
    if (!users) {
      throw new NotFoundException(`user nickname ${userInput} not found`);
    }
    return users;
  }

  // [2 - 1] 유저Id로 팔로우 목록 조회
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
          // isFollowed: obj.followed.isFollowed,
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

  // [4] 유저 id로 정보 조회
  async getUser(id: number): Promise<GetUserDto> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`user id ${id} not found`);
    }
    // [2-2]를 호출하여 내가 팔로우한 유저인지 아닌지 확인한 값을 추가
    // user.isfollowed = await this.isFollowUser(myUserId, id)
    return user;
  }

  async deleteOne(id: number): Promise<void> {
    const user = await this.getUser(id);
    if (user) {
      await this.userRepository.delete(id);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const simpleUserDto = await this.getUser(id);
    if (simpleUserDto) {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          nickname: updateUserDto.nickname,
          image: updateUserDto.image,
          introduce: updateUserDto.introduce,
        })
        .where('user_id = :id', { id })
        .execute();
    }
  }
}
