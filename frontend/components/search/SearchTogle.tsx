import { newTogleState, topicTogleState } from '@/recoil/search';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function searchTogle() {
    const [topicTogle, setTopicTogle] = useRecoilState(topicTogleState);
    const [newTogle, setNewTogle] = useRecoilState(newTogleState);
    const topicTogleWrapperClasses = `
        py-2 px-1 h-12 md:h-14 cursor-pointer w-30 
        `;
    const newTogleWrapperClasses = `
        py-2 h-12 md:h-14 cursor-pointer w-32 md:w-36
        `;
    const isOnTogle = `
        border-b-4 border-black
        `;

    return (
        <section
            className="section flex-row h-12 space-x-24 border-b-4 border-gray-400 bg-white
                  text-lg text-center
                  md:w-full md:h-14 md:text-2xl"
        >
            <article className="article w-30 flex flex-row ml-3 bg-white">
                <div
                    className={`${topicTogleWrapperClasses} ${
                        topicTogle.togleValue ? isOnTogle : ''
                    }`}
                    onClick={() => setTopicTogle({ togleValue: true })}
                >
                    토픽
                </div>
                <div
                    className={`${topicTogleWrapperClasses} ${
                        topicTogle.togleValue ? '' : isOnTogle
                    }`}
                    onClick={() =>
                        setTopicTogle({
                            togleValue: false,
                        })
                    }
                >
                    리프
                </div>
            </article>
            <article className="article w-40 flex flex-row pr-3 bg-white justify-end">
                <div
                    className={`${newTogleWrapperClasses} ${
                        newTogle.togleValue ? isOnTogle : ''
                    } md:px-8`}
                    onClick={() => setNewTogle({ togleValue: true })}
                >
                    최신순
                </div>
                <div
                    className={`${newTogleWrapperClasses} ${
                        newTogle.togleValue ? '' : isOnTogle
                    } md:px-6`}
                    onClick={() => setNewTogle({ togleValue: false })}
                >
                    좋아요순
                </div>
            </article>
        </section>
    );
}
