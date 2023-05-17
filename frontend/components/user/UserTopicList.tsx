import { UserTopicListItem } from './UserTopicListItem';

interface Props {
  topics: any;
}

export const UserTopicsList = ({ topics }: Props) => {
  return topics.map((topic: any, idx: number) => {
    return (
      <div className="w-auto h-[90%]" key={idx}>
        <UserTopicListItem
          topic_id={topic.topic_id}
          needHelp={topic.needHelp}
          creation_time={topic.creation_time}
          rootLeaf={topic.rootLeaf}
          bestLeaf={topic.bestLeaf}
          key={idx}
        />
      </div>
    );
  });
};
