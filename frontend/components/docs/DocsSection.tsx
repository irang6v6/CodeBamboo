import { useState } from "react";

interface Props {
  title: string;
  contents: string[];
}

export const DocsSection = ({ title, contents }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const sectionHeader = (
    <div
      className={`relative w-full ${
        isClicked ? "h-[20%]" : "h-[100%]"
      } p-2 transition-all`}
    >
      <div
        className={`absolute transition-all top-1/2 ${
          isClicked
            ? "left-4 translate-x-0 text-lg md:text-2xl"
            : "left-1/2 translate-x-[-50%] text-3xl md:text-5xl"
        } translate-y-[-50%]`}
      >
        {title}
      </div>
    </div>
  );

  const contentItems = contents.map((content, idx) => {
    return <div className="text-xl" key={idx}>{content}</div>;
  });

  const sectionBody = (
    <div
      className={`relative w-full border-t-2 border-black bottom-0 ${
        isClicked ? "h-[80%]" : ""
      } p-2 transition-all overflow-y-hidden flex flex-col justify-evenly items-center`}
    >
      {contentItems}
    </div>
  );

  return (
    <section
      className={`w-full h-[200%] p-4 mb-3 rounded-xl shadow-lg shadow-slate-400 transition-all bg-[#F2F2F8]
                  md:w-[45%] md:h-[45%] md:p-5 md:mb-0
                  md:hover:scale-105 md:hover:cursor-pointer`}
      onClick={() => setIsClicked((prev) => !prev)}
    >
      <div className="w-full h-full overflow-y-hidden transition-all shadow-inner shadow-slate-400 bg-white">
        {sectionHeader}
        {sectionBody}
      </div>
    </section>
  );
};
