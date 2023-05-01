import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Topic } from './entities/topic.entity';
import { Repository, Like } from 'typeorm';
import { CreateTopicDto } from './dto/create.topic.dto';
import { SimpleTopicDto } from './dto/simple.topic.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TopicsService {
  constructor(
    @Inject('TOPIC_REPOSITORY')
    private topicRepository: Repository<Topic>,
  ) {}

  async getAll(): Promise<SimpleTopicDto[]> {
    const getall = this.topicRepository.find({
      relations: ['user'],
      loadRelationIds: true,
    });
    return await getall;
  }

  //   async search(userInput: string): Promise<SimpleUserDto[]> {
  //     const users = await this.userRepository.find({
  //       where: { nickname: Like(`%${userInput}%`) },
  //     });
  //     if (!users) {
  //       throw new NotFoundException(`user nickname ${userInput} not found`);
  //     }
  //     return users;
  //   }

  async getOne(id: number): Promise<SimpleTopicDto> {
    const topic = await this.topicRepository.findOne({
      where: { topic_id: id },
      relations: ['user'],
      loadRelationIds: true,
    });
    // console.log(topic);
    if (!topic) {
      throw new NotFoundException(`user id ${id} not found`);
    }
    return topic;
  }

  async create(createTopicDto: CreateTopicDto): Promise<CreateTopicDto> {
    console.log(createTopicDto);
    const topic = {
      user_id: createTopicDto.user.user_id,
      ...createTopicDto,
    };
    console.log(`"topic: " ${topic}`);
    const newTopic = this.topicRepository.create(topic);
    console.log(newTopic);
    return await this.topicRepository.save(newTopic);
  }

  // async create(createTopicDto: CreateTopicDto): Promise<void> {
  //   await this.topicRepository.save(createTopicDto);
  // }

  //   async deleteOne(id: number): Promise<void> {
  //     const simpleUserDto = await this.getOne(id);
  //     if (simpleUserDto) {
  //       await this.userRepository.delete(id);
  //     }
  //   }

  //   async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
  //     const simpleUserDto = await this.getOne(id);
  //     if (simpleUserDto) {
  //       await this.userRepository
  //         .createQueryBuilder()
  //         .update(User)
  //         .set({
  //           nickname: updateUserDto.nickname,
  //           image: updateUserDto.image,
  //           introduce: updateUserDto.introduce,
  //         })
  //         .where('user_id = :id', { id })
  //         .execute();
  //     }
  //   }
}
