import { useEffect, useState } from "react";
import { StateSetter, FALLBACK_4K_SCREEN_WIDTH, FALLBACK_LAPTOP_SCREEN_WIDTH, FALLBACK_TABLET_SCREEN_WIDTH } from "@/app/lib/constants";

export interface ResponsiveState {
  width: number;
  isTabletScreen: boolean;
  isMobileScreen: boolean;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState]: StateSetter<ResponsiveState> = useState<ResponsiveState>({
    width: FALLBACK_4K_SCREEN_WIDTH,
    isTabletScreen: false,
    isMobileScreen: false
  });
  useEffect((): () => void => {
    const handleResize = (): void => {
      const width: number = window.visualViewport?.width || window.innerWidth;
      const isTabletScreen = width < FALLBACK_LAPTOP_SCREEN_WIDTH;
      const isMobileScreen = width < FALLBACK_TABLET_SCREEN_WIDTH;
      setState({ width, isTabletScreen, isMobileScreen });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", (): void => {
      if (document.visibilityState === "visible") handleResize();
    });

    return (): void => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      document.removeEventListener("visibilitychange", handleResize);
    };
  }, []);

  return state;
};
