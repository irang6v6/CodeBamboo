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

function SearchModal() {
    const SearchModal = useRecoilValue(searchModalState);
    const handleIsSearchModalOpen = useSetRecoilState(toggleSearchModal);
    const [inputValue, setInputValue] = useRecoilState(searchInputState);
    const [searchInput, setSearchInput] = useState<String>('');
    const router = useRouter();
    // console.log(SearchModal.isOpen);
    const modalWrapperClasses = `
        ${SearchModal.isOpen ? '' : 'hidden'}
        search-modal-wrapper
    `;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    const handleSubmit = () => {
        setInputValue((prev) => ({ ...prev, inputValue: searchInput }));
        handleIsSearchModalOpen({
            isOpen: false,
        });
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
            w-11/12 h-16 border-none bg-black flex flex-row z-40
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
                autoFocus
            ></input>
        </div>
    );
}

export default SearchModal;
