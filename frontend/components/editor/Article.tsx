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
      className="flex p-4 bg-inherit
                h-full
                md:h-1/2"
    >
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='font-bold'>Title :</div>
        <input
          className="h-8 max-w-md article-input"
          maxLength={100}
          {...register('title', { required: true, maxLength: 100 })}
          type="text"
          name="title"
          value={localArticle.title}
          onChange={handleInputChange}
          placeholder='제목'
        />
        <div className='font-bold'>Content :</div>
        <textarea
          className="resize-none h-full article-input"
          {...register('content')}
          name='content'
          value={localArticle.content || ""}
          onChange={handleInputChange}
          placeholder='내용'
        />
        <button
          className='bamboo-button place-self-end'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
