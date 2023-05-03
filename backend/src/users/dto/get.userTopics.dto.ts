export class LeafData {
  logId: number;
  title: string;
  content: string;
  codes: {
    codeId: number;
    language: string;
    content: string;
  }[];
}

// 데코레이터 넣어주세요 ㅋ
export class UserTopics {
  topicId: number;
  needHelp: boolean;
  rootLeaf?: LeafData;
  bestLeaf?: LeafData;
}

export class getUserTopicsDTO {
  message : string;
  data : UserTopics[];
}
