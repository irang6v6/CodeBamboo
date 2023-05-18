import {
  Injectable,
  Inject,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { Leaf } from './entities/leaf.entity';
import { Repository, Like } from 'typeorm';
import { Code } from './entities/code.entity';
import { CreateCodeDto } from './dto/create.code.dto';
import { makeLeaf } from './utils/utils';
import { UpdateLeafDto } from './dto/update.leaf.dto';
import { Response } from 'express';
// import { createReadStream } from 'fs';
import path, { join } from 'path';
import { createReadStream } from 'fs';

@Injectable()
export class LeafsService {
  constructor(
    @Inject('LEAF_REPOSITORY')
    private leafRepository: Repository<Leaf>,
    @Inject('CODE_REPOSITORY')
    private codeRepository: Repository<Code>,
  ) {}

  async search(userInput: string) {
    //title로 조회. where문으로 검색할 수 있음. 괄호 주의
    const titleLeafs = await this.leafRepository.find({
      where: [
        {
          title: Like(`%${userInput}%`),
        },
        { user: { nickname: Like(`%${userInput}%`) } },
      ],
      relations: { user: true, likes: true, codes: true },
    });
    //닉네임이나 타이틀로 검색 안되면 []로 들어와서 길이를 재서 유무 판별
    if (titleLeafs.length == 0) {
      throw new NotFoundException(
        `'${userInput}'(이)라는 검색결과를 찾을 수 없습니다.`,
      );
    } else if (titleLeafs.length > 0) {
      const title = titleLeafs.map((data) => makeLeaf(data));
      return title;
    }
  }

  async getOne(id: number) {
    const leaf = await this.leafRepository.findOne({
      relations: { user: true, likes: true, codes: true, topic: true },
      where: { leaf_id: id },
    });
    // console.log(leaf);
    if (!leaf) {
      throw new NotFoundException(`leaf id ${id} not found`);
    }
    const response = makeLeaf(leaf);
    return response;
  }

  async create(data, userId): Promise<void> {
    // console.log(data);
    //user와 topic에 맞추어줌.
    const user = { user: { user_id: userId } };
    const topicId = { topic: { topic_id: data.topic_id } };

    //type 코드 없으면0, 있으면1 처리
    let type = { type: 1 };
    if (data.codes.length == 0) {
      type = { type: 0 };
    }
    //code만 따로 저장
    const createCode = data.codes;

    //여기다가 leafTree만들어보자.

    //json받아서 parent_id로 ref_order, step넣어야 함.
    //parent_id로 leaf찾아서 step따져서 다음 스텝
    const findParent = await this.leafRepository.findOne({
      where: { leaf_id: data.parent_leaf_id },
    });
    // console.log(findParent);
    const step = { step: findParent.step + 1 };

    // parent_id같은 leaf찾아서 있으면 leaf들 중 ref_order 마지막에 넣기
    // 없으면 parent_id 다음 ref_order로
    const leafOrder = await this.leafRepository.find({
      where: { parent_leaf_id: findParent.leaf_id },
      order: { ref_order: 'DESC' },
    });
    // console.log(leafOrder);
    let ref_order_cnt = 0;
    if (leafOrder.length === 0) {
      ref_order_cnt = findParent.ref_order + 1;
    } else {
      ref_order_cnt = leafOrder[0].ref_order + 1;
    }
    const ref_order = { ref_order: ref_order_cnt };

    // 넣기 전에 같은 토픽id를 가진 리프 중 해당 ref_order와 같거나 큰 ref_order 돌면서 하나씩 늘리기
    const update_ref_order_bigger = await this.leafRepository
      .createQueryBuilder()
      .update('leaf')
      .set({ ref_order: () => 'ref_order + 1' })
      .where('leaf.topic_id = :topic_id', { topic_id: data.topic_id })
      .andWhere('leaf.ref_order >= :order', { order: ref_order_cnt })
      .execute();
    // console.log(update_ref_order_bigger);

    let json = {
      ...data,
      ...user,
      ...topicId,
      ...type,
      ...step,
      ...ref_order,
    };
    //json에서 code객체만 추출 후 재정의
    const { code, ...obj } = json;
    json = obj;

    //재정의한 객체를 leaf에 저장
    const createLeaf = await this.leafRepository.save(json);
    // const saveLeaf = await this.leafRepository.save(createLeaf);
    //leaf_id 가져오기
    const leaf_id = createLeaf.leaf_id;

    //따로 빼놓았던 code를 DB에 저장
    for (let index = 0; index < createCode.length; index++) {
      const element = createCode[index];
      // console.log(element);
      const id = { leaf: { leaf_id: leaf_id } };
      const json: CreateCodeDto = { ...element, ...id };
      const newCode = this.codeRepository.create(json);
      await this.codeRepository.save(newCode);
    }
    return createLeaf;
  }

  //   async deleteOne(id: number): Promise<void> {
  //     const simpleUserDto = await this.getOne(id);
  //     if (simpleUserDto) {
  //       await this.userRepository.delete(id);
  //     }
  //   }

  async download(res: Response, id: number) {
    const getCodes = await this.leafRepository.findOne({
      where: { leaf_id: id },
    });
    // const fileName = encodeURIComponent('한글파일.txt');
    // const file = createReadStream(join(process.cwd()));
    // console.log(file);
    // res.set({
    //   'Content-Disposition': `attachment; filename=${fileName}`,
    // });
    // const newFile = new StreamableFile(file);
    // return getCodes;
    // const file = createReadStream(join(process.cwd(), 'package.json'));
    // return file.pipe(res);
  }

  async update(id: number, updateLeafDto: UpdateLeafDto): Promise<void> {
    const leafDto = await this.getOne(id);
    const leaf_id = { leaf: { leaf_id: id } };
    //
    if (leafDto) {
      //update의 코드를 먼저 꺼내서 코드가 있으면 type=1 없으면 0,
      let type = 0;
      if (leafDto.codes) {
        await this.codeRepository
          .createQueryBuilder('codes')
          .delete()
          .where('leaf_id = :leaf_id', { leaf_id: id })
          .execute();
      }
      if (updateLeafDto.codes) {
        const leafCodeLength = Object.keys(updateLeafDto.codes).length;
        type = 1;

        for (let index = 0; index < leafCodeLength; index++) {
          const element = updateLeafDto.codes[index];
          // console.log(element);
          const json = { ...element, ...leaf_id };
          // console.log(json);
          const newCode = this.codeRepository.create(json);
          await this.codeRepository.save(newCode);
        }
      }
      // console.log(updateLeafDto);
      // 코드 update이후 leaf update 이때 type도 같이 가져가게
      let contentDto = updateLeafDto.content;
      if (!contentDto) {
        contentDto = null;
      }
      console.log(contentDto);
      const updateLeaf = await this.leafRepository
        .createQueryBuilder()
        .update(Leaf)
        .set({
          title: updateLeafDto.title,
          content: contentDto,
          type: type,
        })
        .where('leaf_id = :id', { id })
        .execute();
    }
  }

  async invalidLeaf(id: number) {
    const leaf = await this.leafRepository.findOne({
      relations: { user: true, likes: true, codes: true, topic: true },
      where: { leaf_id: id },
    });
    // console.log(leaf);
    if (!leaf) {
      throw new NotFoundException(`leaf id ${id} not found`);
    }
    // console.log(leafDto);
    if (!leaf.is_root && !leaf.is_deleted) {
      if (leaf.codes) {
        await this.codeRepository
          .createQueryBuilder('users')
          .delete()
          .from(Code)
          .where('leaf_id = :leaf_id', { leaf_id: id })
          .execute();
      }
      const element = {
        language: 'HTML',
        content: '<div>삭제된 리프입니다.</div>',
      };
      const leaf_id = { leaf: { leaf_id: id } };
      const json = { ...element, ...leaf_id };
      // console.log(json);
      const newCode = this.codeRepository.create(json);
      await this.codeRepository.save(newCode);

      const updateLeaf = await this.leafRepository
        .createQueryBuilder()
        .update(Leaf)
        .set({
          title: '삭제된 리프입니다.',
          content: '삭제된 리프입니다.',
          type: 0,
          is_deleted: true,
        })
        .where('leaf_id = :id', { id })
        .execute();
    } else {
      return '해당 leaf는 삭제 될 수 없습니다.';
    }
    return 'leaf가 삭제되었습니다.';

    // const updateLeaf = await this.leafRepository
    //   .createQueryBuilder()
    //   .update(Leaf)
    //   .set({
    //     title: '삭제된 게시글',
    //     content: 'this content have been deleted',
    //     type: 0,
    //     codes:{},
    //   })
    //   .where('leaf_id = :id', { id })
    //   .execute();
    // }
  }
}
