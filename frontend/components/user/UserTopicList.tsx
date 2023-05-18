import { UserTopicListItem } from './UserTopicListItem';

interface Props {
  topics: any;
}

export const UserTopicsList = ({ topics }: Props) => {
  if (topics.length === 0) {
    return (
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        작성한 토픽이 없어요.
      </div>
    );
  }
  return topics.map((topic: any, idx: number) => {
    return (
      <div className="md:w-[45%] md:mr-[2%] h-full md:h-[95%]" key={idx}>
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
