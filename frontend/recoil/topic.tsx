import { mainTopicListInF } from '@/components/topic/TopicInterface';
import { atom } from 'recoil';
import { TopicItemInF } from '../components/topic/TopicInterface';

export interface CodeObject {
  code_id: number | null;
  language: string;
  content: string | null;
}

export const codeState = atom<CodeObject[]>({
  key: 'codeState',
  default: [
    {
      code_id: null,
      language: 'HTML',
      content: null,
    },
    {
      code_id: null,
      language: 'CSS',
      content: null,
    },
    {
      code_id: null,
      language: 'JavaScript',
      content: null,
    },
  ],
});

export interface ArticleObject {
  title: string;
  content: string | null;
}

export const articleState = atom<ArticleObject>({
  key: 'articleState',
  default: {
    title: '',
    content: '',
  },
});

export interface LeafObject {
  codes: CodeObject[];
  content: string;
  exportCnt: number;
  isBookmarked: boolean;
  isLiked: boolean;
  is_deleted: boolean;
  is_root: boolean;
  leaf_id: number;
  likeCnt: number;
  nickname: string;
  parent_leaf_id: number;
  ref_order: number;
  step: number;
  title: string;
  type: number;
  user_id: number;
}

export const LeafState = atom<LeafObject[]>({
  key: 'LeafState',
  default: [],
});

export interface selectedObject {
  leaf_id: number | null;
  user_id: number | null;
  nickname: string | null;
}

export const selectedLeafState = atom<selectedObject>({
  key: 'selectedLeafState',
  default: {
    user_id: null,
    leaf_id: null,
    nickname: null
  },
});

export const mainTopicListState = atom<mainTopicListInF>({
  key: 'mainTopicListState',
  default: {
    popular: [],
    trending: [],
  },
});

export const gptTrigger = atom({
  key: 'getTrigger',
  default:false
})
