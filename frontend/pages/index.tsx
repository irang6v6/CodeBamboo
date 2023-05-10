import { Intro } from '@/components/main/Intro';
import Main from '@/components/main/Main';

export default function Home() {
  return (
    <div className="w-full h-[820vh]">
      <Intro />
      <Main />
    </div>
  );
}
