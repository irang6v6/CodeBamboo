import { Topic } from "src/topics/entities/topic.entity";
import { UserTopics } from "../dto/get.userTopics.dto";

// user.topics 찜찌기 with GPT-4
export function transformUserTopics(userTopics: Topic[]): UserTopics[] {
  return userTopics.map((topic) => {
    const rootLeaf = topic.leafs.find((leaf) => leaf.is_root);
    const bestLeaf = topic.leafs
      .filter((leaf) => !leaf.is_root)
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 1)[0];

    return {
      topicId: topic.topic_id,
      needHelp: topic.needHelp,
      rootLeaf: rootLeaf
        ? {
            logId: rootLeaf.leaf_id,
            title: rootLeaf.title,
            content: rootLeaf.content,
            codes: rootLeaf.code.map((code) => ({
              codeId: code.code_id,
              language: code.language,
              content: code.content,
            })),
          }
        : null,
      bestLeaf: bestLeaf
        ? {
            logId: bestLeaf.leaf_id,
            title: bestLeaf.title,
            content: bestLeaf.content,
            codes: bestLeaf.code.map((code) => ({
              codeId: code.code_id,
              language: code.language,
              content: code.content,
            })),
          }
        : null,
    };
  });
}
