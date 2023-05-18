export function makeLeaf(data) {
  // console.log(data);
  const leaf_id = { leaf_id: data.leaf_id };
  const nickname = { nickname: data.user.nickname };
  const image = { image: data.user.image };
  const title = { title: data.title };
  const content = { content: data.content };
  const type = { type: data.type };
  const codes = { codes: data.codes };
  const parentLeafId = { parentLeafId: data.parent_leaf_id };
  const exportCnt = { exportCnt: data.export };
  const is_deleted = { is_deleted: data.is_deleted };
  const likeCnt = { likeCnt: data.likes.length };
  const user_id = { user_id: data.user.user_id };
  const creation_time = { creation_time: data.creation_time };
  const topic_id = { topic_id: data.topic.topic_id };
  const response = {
    ...leaf_id,
    ...user_id,
    ...topic_id,
    ...nickname,
    ...image,
    ...creation_time,
    ...title,
    ...content,
    ...type,
    ...codes,
    ...exportCnt,
    ...is_deleted,
    ...parentLeafId,
    ...likeCnt,
  };
  return response;
}
