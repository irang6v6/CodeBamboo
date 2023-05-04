import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { articleState, codeState } from '@/recoil/topic';
import { useRecoilState, useRecoilValue } from 'recoil';

interface Props {}

export const Article = ({}: Props) => {
  const [article, setArticle] = useRecoilState(articleState);
  const code = useRecoilValue(codeState);
  const [localArticle, setLocalArticle] = useState(article)
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      title: `${article.title}`,
      content: `${article.content}`,
    },
  });

  useEffect(() => {
    setLocalArticle(article)
  }, [article])

  const onSubmit = () => {
    console.log({...watch(), codes:code});
    console.log(article)
  };

  const handleInputChange = useCallback(
    (event: { target: { name: string; value: string; }; }) => {
      const {name, value} = event?.target
      setLocalArticle((prev) => ({...prev, [name]:value}))
      setArticle((prev) => ({...prev, [name]:value}))
    },
    [setArticle]
  )

  return (
    <div
      className="bg-editor text-white flex justify-center 
                      h-full
                      md:bg-inherit md:h-1/2"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="my-7 bg-white h-8 w-full max-w-md  border-black text-black"
          maxLength={100}
          {...register('title', { required: true, maxLength: 100 })}
          type="text"
          name="title"
          value={localArticle.title}
          onChange={handleInputChange}
          placeholder='제목'
        />
        <textarea
          className="resize-none bg-white h-3/5 w-full max-w-lg border-black text-black"
          {...register('content')}
          name='content'
          value={localArticle.content || ""}
          onChange={handleInputChange}
          placeholder='내용'
        />
        <button
          className='bg-bamboo text:white'
        >
          submit
        </button>
      </form>
    </div>
  );
};
