import { Leaf } from 'src/leafs/entities/leaf.entity';

// 해당 토픽의 가장 좋아요수가 높은 리프 ID[DB상의 id] 반환
export function searchBestLeafId(topicLeafs: Leaf[]) {
  let bestLeafId = topicLeafs[0].leaf_id;
  let bestLeafLikes = topicLeafs[0].likes.length;
  if (topicLeafs.length > 1) {
    for (let i = 1; i < topicLeafs.length; i++) {
      if (topicLeafs[i].likes.length > bestLeafLikes) {
        bestLeafId = topicLeafs[i].leaf_id;
        bestLeafLikes = topicLeafs[i].likes.length;
      }
    }
  }
  return bestLeafId;
}
