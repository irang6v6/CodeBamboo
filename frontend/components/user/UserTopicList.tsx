import { UserTopicListItem } from './UserTopicListItem';

interface Props {
  topics: any;
}

export const UserTopicsList = ({ topics }: Props) => {
  return topics.map((topic: any, idx: number) => {
    return (
      <div className="md:w-[95%] h-[17.5rem] md:h-[26rem]">
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
