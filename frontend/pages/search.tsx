import SearchBar from '@/components/search/SearchBar';
import SearchTogle from '@/components/search/SearchTogle';
import authApi from '@/hooks/api/axios.authorization.instance';
import useIsMobile from '@/hooks/useIsMobile';
import {
    newTogleState,
    searchInputState,
    topicTogleState,
} from '@/recoil/search';
import React, { ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SearchItem } from '@/components/search/SearchItem';
// import { SearchTopicFn } from '@/hooks/api/search.api';

interface Props {}

export const Search = ({}: Props) => {
    const [inputValue, setInputValue] = useRecoilState(searchInputState);
    const isMobile = useIsMobile();
    const [isTopicFound, setIsTopicFound] = useState(true);
    const [isLeafFound, setIsLeafFound] = useState(true);
    const isTopic = useRecoilValue(topicTogleState);
    const isNew = useRecoilValue(newTogleState);
    const [searchTopicItems, setSearchTopicItems] = useState(
        (): ReactNode => <></>
    );
    const [likesTopicItems, setlikesTopicItems] = useState(
        (): ReactNode => <></>
    );
    const [searchLeafItems, setSearchLeafItems] = useState(
        (): ReactNode => <></>
    );
    const [likesLeafItems, setlikesLeafItems] = useState(
        (): ReactNode => <></>
    );
    const searchItemClass = `w-screen 
    h-full bg-white 
    md:w-full md:h-full md:justify-center md:grid md:grid-cols-2 xl:grid xl:grid-cols-3 md:overflow-y-scroll scrollbar-hide`;

    const notFoundClass = () => {
        return (
            <div className="bg-white place-item-center h-full w-full ">
                <img
                    src="/images/404Icon.png"
                    className="md:mt-20 md:mx-20 border border-black md:h-30"
                ></img>
                <div className="border border-black justify-center content-center">
                    토픽에서는 {inputValue.inputValue}(을)를 찾을 수 없습니다.
                </div>
            </div>
        );
    };

    const searchTopicFn = async (userInput: any) => {
        if (!userInput) return;
        try {
            const response = await authApi.get(
                `topic/search?input=${userInput}`
            );
            return response.data;
        } catch (data: any) {
            setIsTopicFound(false);
        }
    };
    const getTopic = useQuery(
        ['topic', inputValue.inputValue],
        () => searchTopicFn(inputValue.inputValue),
        {
            onSuccess: (data) => {
                if (data) {
                    setSearchTopicItems(
                        data
                            .reverse()
                            .slice(0, 6)
                            .map((obj: any, idx: number) => {
                                return (
                                    <SearchItem
                                        topic_id={obj.topic_id}
                                        needHelp={obj.needHelp}
                                        creation_time={obj.creation_time}
                                        rootLeaf={obj.rootLeaf}
                                        bestLeaf={obj.bestLeaf}
                                        key={idx}
                                    />
                                );
                            })
                    ),
                        setIsTopicFound(true);
                    data.sort((prev: any, cur: any) => {
                        // age 기준 내림차순 정렬
                        if (prev.rootLeaf.likeCnt < cur.rootLeaf.likeCnt)
                            return 1;
                        if (prev.rootLeaf.likeCnt > cur.rootLeaf.likeCnt)
                            return -1;
                    });
                    // console.log(data);
                    setlikesTopicItems(
                        data.slice(0, 6).map((obj: any, idx: number) => {
                            return (
                                <SearchItem
                                    topic_id={obj.topic_id}
                                    needHelp={obj.needHelp}
                                    creation_time={obj.creation_time}
                                    rootLeaf={obj.rootLeaf}
                                    bestLeaf={obj.bestLeaf}
                                    key={idx}
                                />
                            );
                        })
                    );
                }
            },
            onError: (data) => {
                console.log(data);
            },
        }
    );

    const searchLeafFn = async (userInput: any) => {
        if (!userInput) return;
        try {
            const response = await authApi.get(
                `leaf/search?input=${userInput}`
            );
            return response.data;
        } catch (data: any) {
            // console.log(data.response.data.message);
            setIsLeafFound(false);
        }
    };
    const getLeaf = useQuery(
        ['leaf', inputValue.inputValue],
        () => searchLeafFn(inputValue.inputValue),
        {
            onSuccess: (data) => {
                if (data) {
                    // console.log(data);
                    setSearchLeafItems(
                        data.reverse().map((obj: any, idx: number) => {
                            return (
                                <SearchItem
                                    topic_id={obj.topic_id}
                                    needHelp={false}
                                    creation_time={obj.creation_time}
                                    rootLeaf={obj}
                                    bestLeaf={obj}
                                    key={idx}
                                />
                            );
                        })
                    ),
                        setIsLeafFound(true);
                    data.sort((prev: any, cur: any) => {
                        // age 기준 내림차순 정렬
                        if (prev.likeCnt < cur.likeCnt) return 1;
                        if (prev.likeCnt > cur.likeCnt) return -1;
                    });
                    // console.log(data);
                    setlikesLeafItems(
                        data.slice(0, 6).map((obj: any, idx: number) => {
                            return (
                                <SearchItem
                                    topic_id={obj.topic_id}
                                    needHelp={false}
                                    creation_time={obj.creation_time}
                                    rootLeaf={obj}
                                    bestLeaf={obj}
                                    key={idx}
                                />
                            );
                        })
                    );
                }
            },
            onError: (data) => {
                console.log(data);
            },
        }
    );

    const TopicList = () => {
        return isTopicFound ? (
            //토픽 찾았을 때
            isNew.togleValue ? (
                <div className={searchItemClass}>{searchTopicItems}</div>
            ) : (
                <div className={searchItemClass}>{likesTopicItems}</div>
            )
        ) : (
            //토픽 찾지 못했을 때
            notFoundClass()
        );
    };
    const LeafList = () => {
        return isLeafFound ? (
            isNew.togleValue ? (
                <div className={searchItemClass}>{searchLeafItems}</div>
            ) : (
                <div className={searchItemClass}>{likesLeafItems}</div>
            )
        ) : (
            notFoundClass()
        );
    };

    useEffect(() => {
        //api통신 여기에서
        // console.log('inputValue바뀜');
    }, [inputValue, isTopicFound, isLeafFound]);
    return (
        <div className="h-full w-full md:w-full bg-white">
            <header
                className="header h-20 bg-white
                            md:h-16 md:w-[96%] md:mx-[2%]"
            ></header>
            <main className="main md:w-[96%] md:mx-[2%] md:h-[90%] bg-white">
                <SearchTogle />
                {isTopic.togleValue ? TopicList() : LeafList()}
            </main>
            <SearchBar />
        </div>
    );
};

export default Search;
