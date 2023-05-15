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
      content: '',
    },
    {
      code_id: null,
      language: 'CSS',
      content: '',
    },
    {
      code_id: null,
      language: 'JavaScript',
      content: '',
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
  leaf_id: number;
  nickname: string;
  title: string;
  content: string;
  step: number;
  ref_order: number;
  parent_leaf_id: number;
  exportCnt: number;
  likeCnt: number;
  type: number;
  is_root: boolean;
  codes: CodeObject[];
  user_id: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export const LeafState = atom<LeafObject[]>({
  key: 'LeafState',
  default: [],
});

export interface selectedObject {
  leaf_id: number | null;
  user_id: number | null;
}

export const selectedLeafState = atom<selectedObject>({
  key: 'selectedLeafState',
  default: {
    user_id: null,
    leaf_id: null,
  },
});

export const mainTopicListState = atom<mainTopicListInF>({
  key: 'mainTopicListState',
  default: {
    popular: [],
    trending: [],
  },
});
