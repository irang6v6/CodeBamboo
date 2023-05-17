import { useSetRecoilState } from 'recoil';
import authApi from './axios.authorization.instance';
import { leafFoundState, topicFoundState } from '@/recoil/search';

// const setLeafFound = useSetRecoilState(leafFoundState);

const SearchTopicFn = async (userInput: any) => {
    const setisTopicFound = useSetRecoilState(topicFoundState);
    if (!userInput) return;
    try {
        const response = await authApi.get(`topic/search?input=${userInput}`);
        return response.data;
    } catch (data: any) {
        // setIsFound(false);
        console.log('djfdkfjdfdjf');
        setisTopicFound({ foundValue: false });
        return false;
    }
};

const SearchLeafFn = async (userInput: any) => {
    const setLeafFound = useSetRecoilState(leafFoundState);
    if (!userInput) return;
    try {
        const response = await authApi.get(`leaf/search?input=${userInput}`);
        return response.data;
    } catch (data: any) {
        // setIsFound(false);
        setLeafFound({ foundValue: false });
        return false;
    }
};

export { SearchTopicFn, SearchLeafFn };
