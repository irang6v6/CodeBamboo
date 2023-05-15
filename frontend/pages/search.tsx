import SearchBar from '@/components/common/SearchBar';
import SearchTogle from '@/components/common/SearchTogle';
import authApi from '@/hooks/api/axios.authorization.instance';
import useIsClient from '@/hooks/useIsClient';
import useIsMobile from '@/hooks/useIsMobile';
import { searchInputState, topicTogleState } from '@/recoil/search';
import React, { ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TopicItemInF } from '@/components/topic/TopicInterface';
import { TopicItem } from '@/components/topic/TopicItem';

interface Props {}

export const Search = ({}: Props) => {
    const [inputValue, setInputValue] = useRecoilState(searchInputState);
    const isMobile = useIsMobile();
    const [errorValue, setErrorValue] = useState('');
    const [isFound, setIsFound] = useState(true);
    const [leafErrorValue, setLeafErrorValue] = useState('');
    const [isLeafFound, setIsLeafFound] = useState(true);
    const isTopic = useRecoilValue(topicTogleState);
    console.log(isTopic);
    const [searchTopicItems, setSearchTopicItems] = useState(
        (): ReactNode => <></>
    );
    const [searchLeafItems, setSearchLeafItems] = useState(
        (): ReactNode => <></>
    );
    const queryFn = async (userInput: any) => {
        if (!userInput) return;
        try {
            const response = await authApi.get(
                `topic/search?input=${userInput}`
            );
            return response.data;
        } catch (data) {
            // console.log(error.response.data.message);
            setErrorValue(data.response.data.message);
            setIsFound(false);
        }
    };
    const getTopic = useQuery(
        ['topic', inputValue.inputValue],
        () => queryFn(inputValue.inputValue),
        {
            onSuccess: (data) => {
                if (data) {
                    // console.log(data);
                    setSearchTopicItems(
                        data.map((obj, idx: number) => {
                            return (
                                <TopicItem
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
                        setIsFound(true);
                }
            },
            onError: (data) => {
                console.log(data);
            },
        }
    );

    const getLeafFn = async (userInput: any) => {
        if (!userInput) return;
        try {
            const response = await authApi.get(
                `leaf/search?input=${userInput}`
            );
            return response.data;
        } catch (data) {
            console.log(data.response.data.message);
            setLeafErrorValue(data.response.data.message);
            setIsFound(false);
        }
    };
    const getLeaf = useQuery(
        ['leaf', inputValue.inputValue],
        () => getLeafFn(inputValue.inputValue),
        {
            onSuccess: (data) => {
                if (data) {
                    // console.log(data);
                    setSearchLeafItems(
                        data.map((obj, idx: number) => {
                            return (
                                <TopicItem
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
                }
            },
            onError: (data) => {
                console.log(data);
            },
        }
    );

    const TopicList = () => {
        return isFound ? (
            //토픽 찾았을 때
            <div
                className={`w-screen 
          h-full bg-white ${
              isMobile
                  ? 'overflow-x-visible overflow-y-scroll scrollbar-hide'
                  : ''
          }
          md:w-full md:h-full md:justify-center md:grid md:grid-cols-3`}
            >
                {searchTopicItems}
            </div>
        ) : (
            //토픽 찾지 못했을 때
            <div className="bg-white place-item-center h-full w-full ">
                <img
                    src="/images/404Icon.png"
                    className="md:mt-20 md:mx-20 border border-black md:h-30"
                ></img>
                <div className="border border-black justify-center content-center">
                    토픽에서는 {errorValue}
                </div>
            </div>
        );
    };
    const LeafList = () => {
        return isLeafFound ? (
            <div
                className={`w-screen 
          h-full bg-white ${
              isMobile
                  ? 'overflow-x-visible overflow-y-scroll scrollbar-hide'
                  : ''
          }
          md:w-full md:h-full md:justify-center md:grid md:grid-cols-3`}
            >
                {searchLeafItems}
            </div>
        ) : (
            <div className="bg-white place-item-center h-full w-full ">
                <img
                    src="/images/404Icon.png"
                    className="md:mt-20 md:mx-20 border border-black md:h-30"
                ></img>
                <div className="border border-black justify-center content-center">
                    리프에서는 {leafErrorValue}
                </div>
            </div>
        );
    };

    useEffect(() => {
        //api통신 여기에서
        // console.log('inputValue바뀜');
    }, [inputValue, errorValue, leafErrorValue]);
    return (
        <div className="h-full w-full md:w-full bg-yellow-200">
            <header
                className="header h-20 bg-white
                              md:h-24 md:w-[96%] md:mx-[2%]"
            ></header>
            <main className="main md:w-[96%] md:mx-[2%] md:h-[90%] ">
                <SearchTogle />
                {isTopic.togleValue ? TopicList() : LeafList()}
            </main>
            <SearchBar />
        </div>
    );
};

export default Search;
