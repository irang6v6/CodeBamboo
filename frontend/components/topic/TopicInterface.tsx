export interface CodeInF {
  code_id: string;
  language: string;
  content: string;
}

export interface LeafItemInF {
  user_id: number;
  nickname: string;
  title: string;
  content: string;
  type: number;
  codes: CodeInF[];
  exportCnt: number;
  parentLeafId: string;
  likeCnt: number;
  image: string;
}

export interface TopicItemInF {
  topic_id: string;
  needHelp: boolean;
  creation_time: Date;
  rootLeaf: LeafItemInF;
  bestLeaf: LeafItemInF;
}

export interface mainTopicListInF {
  popular: TopicItemInF[];
  trending: TopicItemInF[];
}
