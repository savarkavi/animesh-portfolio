"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface MediaLoadingContextType {
  progress: number | undefined;
  allLoaded: boolean;
  isOverlayAnimComplete: boolean;
  registerMedia: () => void;
  mediaLoaded: () => void;
  setOverlayAnimComplete: () => void;
}

const MediaLoadingContext = createContext<MediaLoadingContextType | undefined>(
  undefined,
);

export const MediaLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isOverlayAnimComplete, setIsOverlayAnimComplete] = useState(false);

  const registerMedia = useCallback(() => {}, []);
  const mediaLoaded = useCallback(() => {}, []);
  const setOverlayAnimComplete = useCallback(() => {
    setIsOverlayAnimComplete(true);
  }, []);

  return (
    <MediaLoadingContext.Provider
      value={{
        progress: undefined,
        allLoaded: true,
        registerMedia,
        mediaLoaded,
        setOverlayAnimComplete,
        isOverlayAnimComplete,
      }}
    >
      {children}
    </MediaLoadingContext.Provider>
  );
};

export const useMediaLoading = (): MediaLoadingContextType => {
  const context = useContext(MediaLoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
