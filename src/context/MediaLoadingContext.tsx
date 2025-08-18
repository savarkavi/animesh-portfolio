"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface MediaLoadingContextType {
  progress: number;
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
  const [totalMedia, setTotalMedia] = useState(0);
  const [loadedMedia, setLoadedMedia] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [isOverlayAnimComplete, setIsOverlayAnimComplete] = useState(false);

  const registerMedia = useCallback(() => {
    setTotalMedia((prev) => prev + 1);
  }, []);

  const mediaLoaded = useCallback(() => {
    setLoadedMedia((prev) => prev + 1);
  }, []);

  const setOverlayAnimComplete = useCallback(() => {
    setIsOverlayAnimComplete(true);
  }, []);

  const progress = totalMedia > 0 ? (loadedMedia / totalMedia) * 100 : 100;

  useEffect(() => {
    if (loadedMedia === totalMedia) {
      setTimeout(() => {
        setAllLoaded(true);
      }, 1000);
    }
  }, [loadedMedia, totalMedia]);

  return (
    <MediaLoadingContext.Provider
      value={{
        progress,
        allLoaded,
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
