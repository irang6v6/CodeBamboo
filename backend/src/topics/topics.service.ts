import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Topic } from './entities/topic.entity';
import { Repository, Like } from 'typeorm';
import { SimpleTopicDto } from './dto/simple.topic.dto';
import { User } from 'src/users/entities/user.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';
import { CreateLeafDto } from 'src/leafs/dto/create.leaf.dto';
import { Code } from 'src/leafs/entities/code.entity';
import { makeTopicLeafs, popularTopic, trendingTopic } from './utils/utils';
import { searchTopic } from './utils/utils';

@Injectable()
export class TopicsService {
  constructor(
    @Inject('TOPIC_REPOSITORY')
    private topicRepository: Repository<Topic>,

    @Inject('LEAF_REPOSITORY')
    private leafRepository: Repository<Leaf>,

    @Inject('CODE_REPOSITORY')
    private codeRepository: Repository<Code>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<SimpleTopicDto[]> {
    const getall = this.topicRepository.find({
      relations: { leafs: true, bestLeaf: true, rootLeaf: true },
    });
    return await getall;
  }

  async mainList() {
    const getall = await this.topicRepository.find({
      relations: {
        leafs: { likes: true, bookmarks: true },
        bestLeaf: true,
        rootLeaf: true,
      },
    });
    // const popularOne = popularTopic(getall[0]);
    const popular = getall.map((data) => popularTopic(data));
    popular.sort((a, b) => {
      return b.value - a.value;
    });
    // console.log(popular);
    const trending = getall.map((data) => trendingTopic(data));
    // console.log(trending);
    let popularLength = 0;
    if (popular.length <= 6) {
      popularLength = popular.length;
    }
    if (trending.length <= popularLength) {
      popularLength = trending.length;
    } else {
      popularLength = 6;
    }
    trending.sort((a, b) => {
      return b.value - a.value;
    });
    // console.log(trending);
    const popularRespone = [];
    const trendingRespone = [];
    for (let index = 0; index < popularLength; index++) {
      const popularOne = await this.topicRepository.findOne({
        relations: {
          user: true,
          rootLeaf: { codes: true, user: true, likes: true },
          bestLeaf: { codes: true, user: true, likes: true },
        },
        where: { topic_id: popular[index]['topic_id'] },
      });
      popularRespone.push(searchTopic(popularOne));

      const trendingOne = await this.topicRepository.findOne({
        relations: {
          user: true,
          rootLeaf: { codes: true, user: true, likes: true },
          bestLeaf: { codes: true, user: true, likes: true },
        },
        where: { topic_id: trending[index]['topic_id'] },
      });
      trendingRespone.push(searchTopic(trendingOne));
    }
    const response = {
      ...{ popular: popularRespone.slice(0, 12) },
      ...{ trending: trendingRespone.slice(0, 12) },
    };
    return response;
  }

  //검색에서는 makeLeaf함수 가능
  async search(userInput: string) {
    //title로 조회. where문으로 검색할 수 있음. 괄호 주의
    const titleTopics = await this.topicRepository.find({
      relations: {
        user: true,
        rootLeaf: { codes: true, user: true, likes: true },
        bestLeaf: { codes: true, user: true, likes: true },
      },
      where: [
        { rootLeaf: { title: Like(`%${userInput}%`) } },
        { user: { nickname: Like(`%${userInput}%`) } },
      ],
    });

    //닉네임이나 타이틀로 검색 안되면 []로 들어와서 길이를 재서 유무 판별
    let topics = [];
    if (titleTopics.length == 0) {
      throw new NotFoundException(
        `'${userInput}'(이)라는 검색결과를 찾을 수 없습니다.`,
      );
    } else if (titleTopics.length > 0) {
      topics = [...titleTopics.map((data) => searchTopic(data))];
    }
    // console.log(topics);
    // const topicsLength = topics?.length;
    // const topicLastPage: number = Math.floor(0 / 6) + 1;
    // console.log(topicLastPage);
    // console.log(topicsLength);
    return topics;
  }

  //getOne에서는 모든 리프를 makeTopicLeafs
  async getOne(id: number, user_id: number) {
    const topic = await this.topicRepository.findOne({
      where: { topic_id: id },
      relations: {
        user: true,
        rootLeaf: {
          codes: true,
          user: true,
          likes: { user: true },
          bookmarks: { user: true },
        },
        bestLeaf: {
          codes: true,
          user: true,
          likes: { user: true },
          bookmarks: { user: true },
        },
        leafs: {
          codes: true,
          user: true,
          likes: { user: true },
          bookmarks: { user: true },
        },
      },
    });
    // console.log(topic);
    const topic_id = { topic_id: topic.topic_id };
    const needHelp = { needHelp: topic.needHelp };
    const creation_time = { creation_time: topic.creation_time };
    const rootLeaf = { rootLeaf: makeTopicLeafs(topic.rootLeaf, user_id) };
    const bestLeaf = { bestLeaf: makeTopicLeafs(topic.bestLeaf, user_id) };
    const leafs = {
      leafs: topic.leafs.map((data) => makeTopicLeafs(data, user_id)),
    };
    const response = {
      ...topic_id,
      ...needHelp,
      ...creation_time,
      ...rootLeaf,
      ...bestLeaf,
      ...leafs,
    };
    // console.log(response);
    if (!topic) {
      throw new NotFoundException(`topic id ${id} not found`);
    }
    // console.log(response);
    return response;
  }

  async create(data, userId): Promise<number> {
    //1.dto가 아닌 그냥 json파일 받아오기
    // console.log(data);

    //2. user와 needHelp를 분리
    const user = { user: { user_id: userId } };
    const need_help = { needHelp: data.needHelp };
    //3.분리한 것으로 topic생성
    const topic = { ...user, ...need_help };
    const newTopic = this.topicRepository.create(topic);
    // console.log(newTopic);
    await this.topicRepository.save(newTopic);
    //4.생성된 topic_id받아오기
    const topic_id = { topic: { topic_id: newTopic.topic_id } };
    // console.log(topic_id);
    //5.topic은 무조건 is_root가 true
    const is_root = { is_root: true };
    //5-1. type 결정하는 로직
    let type = { type: 1 };
    if (data.codes.length == 0) {
      type = { type: 0 };
    }
    //6.data에서 user_id와 needHelp를 분리
    const { user_id, needHelp, ...obj } = data;
    data = obj;
    //7. leafDto를 생성
    const leaf: CreateLeafDto = {
      ...user,
      ...type,
      ...data,
      ...is_root,
      ...topic_id,
    };
    const newLeaf = this.leafRepository.create(leaf);
    // console.log(newLeaf);
    await this.leafRepository.save(newLeaf);
    //8.leaf_id 받아오기
    // console.log(data.codes.length);
    const leaf_id = { leaf: { leaf_id: newLeaf.leaf_id } };
    //8-1. topic이 생성될 때 best_leaf는 root_leaf이므로 topic entity의 best_leaf_id에 leaf_id 수정.
    await this.topicRepository.update(newTopic.topic_id, {
      rootLeaf: { leaf_id: newLeaf.leaf_id },
      bestLeaf: { leaf_id: newLeaf.leaf_id },
    });
    //9.codes의 갯수만큼 for문 돌면서 code생성
    for (let index = 0; index < data.codes.length; index++) {
      const code = { ...leaf_id, ...data.codes[index] };
      // console.log(code);
      const newCodes = this.codeRepository.create(code);
      // console.log(newCodes);
      await this.codeRepository.save(newCodes);
    }
    return newTopic.topic_id;
  }

  async deleteOne(id: number): Promise<void> {
    // const simpleUserDto = await this.getOne(id);
    // // console.log(simpleUserDto.leafs.length);
    // if (!simpleUserDto) {
    //   throw new NotFoundException(`'${id}'번 토픽을 찾을 수 없습니다.`);
    // }
    // if (simpleUserDto.leafs.length > 1) {
    //   throw new UnauthorizedException(
    //     `'${id}'번 토픽은 2개 이상의 리프를 가지고 있어 삭제가 불가능합니다.`,
    //   );
    // } else if (simpleUserDto.leafs.length === 1) {
    //   await this.topicRepository.delete(id);
    // }
  }

  async closeHelp(id: number): Promise<void> {
    await this.topicRepository.update(id, { needHelp: false });
  }

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
