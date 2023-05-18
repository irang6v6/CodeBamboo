import { atom, selector } from 'recoil';

interface SearchModal {
    isOpen: boolean;
}

export const searchModalState = atom<SearchModal>({
    key: 'searchModalState', // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
    default: {
        isOpen: false,
    },
});

export const toggleSearchModal = selector({
    key: 'toggleSearchModal',
    get: ({ get }) => get(searchModalState),
    set: ({ set }) => {
        set(searchModalState, (prevState) => {
            return { ...prevState, isOpen: !prevState.isOpen };
        });
    },
});

interface SearchInput {
    inputValue: String;
}

export const searchInputState = atom<SearchInput>({
    key: 'searchInputState', // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
    default: {
        inputValue: '',
    },
});

interface topicTogle {
    togleValue: boolean;
}

export const topicTogleState = atom<topicTogle>({
    key: 'topicTogleState', // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
    default: {
        togleValue: true,
    },
});

interface newTogle {
    togleValue: boolean;
}

export const newTogleState = atom<newTogle>({
    key: 'newTogleState', // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
    default: {
        togleValue: true,
    },
});

interface topicFound {
    foundValue: boolean;
}

export const topicFoundState = atom<topicFound>({
    key: 'topicFoundState', // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
    default: {
        foundValue: true,
    },
});

interface leafFound {
    foundValue: boolean;
}

export const leafFoundState = atom<leafFound>({
    key: 'leafFoundState', // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
    default: {
        foundValue: true,
    },
});
