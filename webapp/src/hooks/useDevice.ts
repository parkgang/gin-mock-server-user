import { useMediaQuery } from "react-responsive";

export default function useDevice() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const isPC = useMediaQuery({ query: "(min-width: 1024px) and (max-width: 1279px)" });
  const isPCWide = useMediaQuery({ query: "(min-width: 1280px)" });
  const isPCOrPCWide = useMediaQuery({ query: "(min-width: 1024px)" });
  return { isMobile, isTablet, isMobileOrTablet, isPC, isPCWide, isPCOrPCWide };
}
