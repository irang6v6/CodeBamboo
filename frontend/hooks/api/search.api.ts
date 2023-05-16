import { useSetRecoilState } from 'recoil';
import authApi from './axios.authorization.instance';
import { leafFoundState, topicFoundState } from '@/recoil/search';

// const setTopicFound = useSetRecoilState(topicFoundState);
// const setLeafFound = useSetRecoilState(leafFoundState);

const searchTopicFn = async (userInput: any) => {
    if (!userInput) return;
    try {
        const response = await authApi.get(`topic/search?input=${userInput}`);
        return response.data;
    } catch (data: any) {
        // setIsFound(false);
        // setTopicFound({ foundValue: false });
        return data.response.data.message, false;
    }
};

const searchLeafFn = async (userInput: any) => {
    if (!userInput) return;
    try {
        const response = await authApi.get(`leaf/search?input=${userInput}`);
        return response.data;
    } catch (data: any) {
        console.log(data.response.data.message);
        // setIsFound(false);
        return data.response.data.message, false;
    }
};

export { searchTopicFn, searchLeafFn };
