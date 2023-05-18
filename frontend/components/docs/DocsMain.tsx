import { DocsSection } from "./DocsSection";

interface Props {}

export const DocsMain = ({}: Props) => {
  const titleArray = [
    "Create Your Imagination",
    "Plant Your Code Tree",
    "Ask AI for Help",
    "Upgrade Your Skills",
  ];
  const contentArray = [
    [
      "당신의 상상력을 펼쳐보세요.",
      "실시간으로 렌더링을 확인할 수 있어요.",
      "내가 어려움이 있었던 부분을",
      "사람들과 공유할 수 있어요",
    ],
    [
      "내 코드를 뿌리 삼아",
      "다른 사람들과 함께",
      "코드를 발전시킬 수 있어요.",
      "어떤 잎사귀가 가장 인기가 많아질까요 ?",
    ],
    [
      "인공지능에게 물어보고",
      "즉각적인 답변을",
      "실시간 렌더링으로 확인해보세요 !",
    ],
    [
      "CodeBamboo와 함께라면",
      "금새 자라나는 대나무의 마디처럼",
      "여러분의 코딩 실력도",
      "쑥쑥 자라날 수 있어요 !",
    ],
  ];

  const docsSectionItems = titleArray.map((title, idx) => {
    return (
      <DocsSection
        title={title}
        contents={contentArray[idx]}
        key={idx}
      />
    );
  });

  return (
    <main
      className="w-full h-full
                    flex flex-col p-5 overflow-y-auto
                    md:p-10 md:flex md:flex-row md:flex-wrap md:justify-evenly md:overflow-y-none"
    >
      {docsSectionItems}
    </main>
  );
};
