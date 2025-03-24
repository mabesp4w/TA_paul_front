/** @format */

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ReactReaderStyle } from "react-reader";
import { useSettingContext } from "@/context/SettingContext";

// Import ReactReader with dynamic import to avoid SSR issues
const ReactReader = dynamic(
  () => import("react-reader").then((mod) => mod.ReactReader),
  {
    ssr: false,
  }
);

interface EpubReaderProps {
  bookId: string;
  file_book: string;
}

// Definisikan interface untuk pengaturan pembaca
interface ReaderSettings {
  fontSize: number;
  fontFamily: string;
  theme: string;
  lineSpacing: number;
}

const EpubReader = ({ bookId, file_book }: EpubReaderProps) => {
  // context
  const { changeSetting } = useSettingContext();
  const [isLoading, setIsLoading] = useState(true);
  const [epubData, setEpubData] = useState<ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | number>(0);
  const renditionRef = useRef<any>(null);
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>({
    fontSize: 16,
    fontFamily: "sans-serif",
    theme: "light",
    lineSpacing: 1.2,
  });

  useEffect(() => {
    // Reset states when component mounts or file_book changes
    setIsLoading(true);
    setError(null);
    setEpubData(null);

    const fetchEpub = async () => {
      try {
        // Fetch the EPUB file
        const response = await fetch(file_book);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch EPUB: ${response.status} ${response.statusText}`
          );
        }

        // Convert to ArrayBuffer - this is important to avoid CORS and path issues
        const arrayBuffer = await response.arrayBuffer();
        setEpubData(arrayBuffer);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading EPUB:", err);
        setError(
          `Terjadi kesalahan saat memuat buku: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
        setIsLoading(false);
      }
    };

    fetchEpub();

    // Try to load the saved location
    const savedLocation = localStorage.getItem(`epub-location-${bookId}`);
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, [bookId, file_book]);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("readerSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings) as ReaderSettings;
        setReaderSettings(parsedSettings);

        // Apply settings to current rendition if it exists
        if (renditionRef.current) {
          applyReaderSettings(renditionRef.current, parsedSettings);
        }
      } catch (err) {
        console.error("Error parsing reader settings:", err);
      }
    }
  }, [changeSetting]);

  // Function to apply settings to rendition
  const applyReaderSettings = (rendition: any, settings: ReaderSettings) => {
    // Apply font size
    rendition.themes.fontSize(`${settings.fontSize}px`);

    // Apply font family
    rendition.themes.registerRules("default", {
      body: {
        "font-family": settings.fontFamily + " !important",
        "line-height": `${settings.lineSpacing} !important`,
      },
    });

    // Apply theme (background color and text color)
    if (settings.theme === "dark") {
      rendition.themes.registerRules("default", {
        body: {
          "background-color": "#121212 !important",
          color: "#ffffff !important",
        },
      });
    } else {
      rendition.themes.registerRules("default", {
        body: {
          "background-color": "#ffffff !important",
          color: "#000000 !important",
        },
      });
    }
  };

  // Show loader if still loading
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4">Memuat buku...</p>
        </div>
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="alert alert-error w-full max-w-md">
          <div>
            <h3 className="font-bold">Error!</h3>
            <div className="text-sm">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  // If EPUB data is not yet available, show loader
  if (!epubData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4">Menyiapkan buku...</p>
        </div>
      </div>
    );
  }

  const locationChanged = (epubcifi: string) => {
    // epubcifi is a string like "epubcfi(/6/4[chap01ref]!/4/2/1:0)"
    // Store the location to localStorage for persistence
    localStorage.setItem(`epub-location-${bookId}`, epubcifi);
    setLocation(epubcifi);
  };

  // Determine background color based on theme
  // const backgroundColor =
  //   readerSettings.theme === "dark" ? "#121212" : "#f8f8f8";

  return (
    <div className="w-full h-full">
      {/* EPUB Reader Component */}
      <ReactReader
        url={epubData} // Pass the ArrayBuffer
        title={""}
        location={location}
        locationChanged={locationChanged}
        getRendition={(rendition) => {
          renditionRef.current = rendition;

          // Apply all reader settings when rendition is ready
          applyReaderSettings(rendition, readerSettings);
        }}
        swipeable={false}
        epubOptions={{
          flow: "paginated", // or "scrolled"
          manager: "default", // or "continuous"
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styles={{
          ...ReactReaderStyle,
          readerArea: {
            ...ReactReaderStyle.readerArea,
          },
        }}
      />
    </div>
  );
};

export default EpubReader;
