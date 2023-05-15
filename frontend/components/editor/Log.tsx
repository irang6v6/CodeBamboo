import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LeafState } from '@/recoil/topic';
import { LeafItem } from './LeafItem';
import { GrTree } from 'react-icons/gr';
import useIsMobile from '@/hooks/useIsMobile';

export const Log = () => {
    const leafs = useRecoilValue(LeafState);
    const [isLogOpen, setIsLogOpen] = useState(false);
    const isMobile = useIsMobile();

    const LeafItems = () => {
        return (
            <div
                className="bg-gray-400 flex flex-col z-20 h-full overflow-y-auto
                  absolute left-0 w-3/5 
                  md:static md:w-full md:max-w-[10rem]"
            >
                {leafs?.map((e) => (
                    <LeafItem key={e.leaf_id} leaf={e} />
                ))}
            </div>
        );
    };

    const LogOpenBackground = (
        <div
            className="bg-transparent fixed top-0 left-0 w-full h-full z-10
                md:hidden"
            onClick={() => setIsLogOpen(false)}
        >
            ?
        </div>
    );

    return (
        <>
            {isMobile ? (
                !isLogOpen ? (
                    <div
                        className="flex justify-center items-center bg-white rounded-full h-20 w-20 fixed left-8 bottom-10 border-4 border-bamboo"
                        onClick={() => setIsLogOpen(true)}
                    >
                        <GrTree className="text-[3rem] text-white" />
                    </div>
                ) : (
                    <div>
                        <LeafItems />
                        {LogOpenBackground}
                    </div>
                )
            ) : (
                <LeafItems />
            )}
        </>
    );
};
