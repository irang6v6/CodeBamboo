export function makeLeaf(data) {
  const leaf_id = { leaf_id: data.leaf_id };
  const nickname = { nickname: data.user.nickname };
  const title = { title: data.title };
  const content = { content: data.content };
  const type = { type: data.type };
  const codes = { codes: data.codes };
  const parentLeafId = { parentLeafId: data.parent_leaf_id };
  const exportCnt = { exportCnt: data.export };
  const likeCnt = { likeCnt: data.likes.length };
  const response = {
    ...leaf_id,
    ...nickname,
    ...title,
    ...content,
    ...type,
    ...codes,
    ...exportCnt,
    ...parentLeafId,
    ...likeCnt,
  };
  return response;
}
