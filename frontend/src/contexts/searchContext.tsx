import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Ad } from "@/components/RecentAds";
import adService from "@/services/api/adService";
import { set } from "react-hook-form";

interface SearchContextProps {
  searchResults: Ad[];
  searchTerm: string;
  isLoading: boolean;
  setSearchTerm: (term: string) => void;
  updateSearchResults: (results: Ad[]) => void;
  updateAds: () => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchResults, setSearchResults] = useState<Ad[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (searchTerm.length >= 3) {
      const fetchResults = async () => {
        try {
          const resultsSearch = await adService.searchByTitleOrCategory(searchTerm);
          updateSearchResults(resultsSearch || []);
        } catch (error) {
          console.error('Failed to search ad:', error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
      };
      fetchResults();
    } else {
      const fetchAllAds = async () => {
        try {
          const allAds = await adService.getAds();
          updateSearchResults(allAds || []);
        } catch (error) {
          console.error('Failed to fetch ads:', error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
      }
      fetchAllAds();
    }
  }, [searchTerm]);

  const updateSearchResults = (results: Ad[]) => {
    setSearchResults(results);
  };

  const updateAds = async () => {
    setIsLoading(true);
    try {
      const updateResults = await adService.getAds();
      setSearchResults(updateResults || []);
    } catch (error) {
      console.error("Failed to update ads:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  return (
    <SearchContext.Provider value={{ searchResults, searchTerm, isLoading, setSearchTerm, updateSearchResults, updateAds }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};