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
    const [searchInput, setSearchInput] = useState<String>(
        inputValue.inputValue
    );
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
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <div
            className={`${modalWrapperClasses}
            w-11/12 h-16 border-none bg-black flex flex-row
            md:w-4/6 md:h-18 md:top-4
            `}
        >
            <img
                src="/images/icons/search_icon_white.png"
                className=" h-8 w-8 mt-0 ml-3 
                            md:h-8 md:w-8 md:mt-0"
            />
            <input
                className="bg-black ml-3 mr-4 focus:outline-none text-white text-3xl w-full h-full"
                onChange={handleChange}
                onKeyUp={handleKeyPress}
                value={searchInput}
                autoFocus
            ></input>
        </div>
    );
}

export default SearchBar;
