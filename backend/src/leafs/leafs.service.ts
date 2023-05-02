import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Leaf } from './entities/leaf.entity';
import { Repository, Like } from 'typeorm';
import { CreateLeafDto } from './dto/create.leaf.dto';
import { SimpleLeafDto } from './dto/simple.leaf.dto';
import { Code } from './entities/code.entity';

@Injectable()
export class LeafsService {
  constructor(
    @Inject('LEAF_REPOSITORY')
    private leafRepository: Repository<Leaf>,
    @Inject('CODE_REPOSITORY')
    private codeRepository: Repository<Code>,
  ) {}

  async getAll(): Promise<SimpleLeafDto[]> {
    const leaf = await this.leafRepository.find({
      relations: ['user', 'topic', 'code'],
      loadRelationIds: { relations: ['user', 'topic'] },
    });
    return leaf;
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

  // async getOne(id: number): Promise<CreateTopicDto> {
  //   const user = await this.topicRepository.findOne({
  //     where: { topic_id: id },
  //   });
  //   if (!user) {
  //     throw new NotFoundException(`user id ${id} not found`);
  //   }
  //   return user;
  // }

  async create(data): Promise<void> {
    console.log(data);
    //user와 topic type에 맞추어줌.
    const userId = { user: { user_id: data.user_id } };
    const topicId = { topic: { topic_id: data.topic_id } };

    //code만 따로 저장
    const createCode = data.code;
    let json = { ...data, ...userId, ...topicId };

    //json에서 code객체만 추출 후 재정의
    const { code, ...obj } = json;
    json = obj;

    //재정의한 객체를 leaf에 저장
    const createUser = await this.leafRepository.save(json);

    //leaf_id 가져오기
    const leaf_id = createUser.leaf_id;

    //따로 빼놓았던 code를 DB에 저장
    for (let index = 0; index < createCode.length; index++) {
      const element = createCode[index];
      // console.log(element);
      const id = { leaf: { leaf_id: leaf_id } };
      const json = { ...element, ...id };
      // console.log(json);
      await this.codeRepository.save(json);
    }
  }

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
