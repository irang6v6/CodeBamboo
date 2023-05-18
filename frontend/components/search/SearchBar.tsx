import {
    searchInputState,
    searchModalState,
    toggleSearchModal,
} from '@/recoil/search';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Link from 'next/link';
import { useRouter } from 'next/router';

type State = {
    text: string;
};

function SearchBar() {
    const [inputValue, setInputValue] = useRecoilState(searchInputState);
    const [searchInput, setSearchInput] = useState(inputValue.inputValue);
    const router = useRouter();
    const modalWrapperClasses = `
        search-modal-wrapper`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    const handleSubmit = () => {
        setInputValue({ inputValue: searchInput });
        router.push('/search');
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <div
            className={`${modalWrapperClasses}
            border-none bg-black flex flex-row 
            w-11/12 h-14 top-20
            md:w-4/6 md:h-12 md:top-4 placeholder:md:h-10 lg:w-1/2
            `}
        >
            <img
                src="/images/icons/search_icon_white.png"
                className=" h-6 w-6 mt-0 ml-3 
                            md:h-6 md:w-6 md:mt-0"
            />
            <input
                className="bg-black ml-3 mr-4 focus:outline-none text-white text-xl w-full h-full"
                onChange={handleChange}
                onKeyUp={handleKeyPress}
                value={`${searchInput}`}
                placeholder='title, nickname으로 검색 가능합니다.'
                autoFocus
            ></input>
        </div>
    );
}

export default SearchBar;
