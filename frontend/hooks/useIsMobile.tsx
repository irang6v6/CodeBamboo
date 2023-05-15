import { useMediaQuery } from 'react-responsive';
import useIsClient from './useIsClient';

const useIsMobile = () => {
  const isClient = useIsClient();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return isClient ? isMobile : false;
};

export default useIsMobile;