import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import categoryService from "@/services/api/categoryService";
import { CategoryProps } from "@/components/Category";

interface CategoryContextProps {
  categories: CategoryProps[];
  updateCategories: () => void;
}

interface CategoryProviderProps {
  children: ReactNode;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const updateCategories = async () => {
    const categories = await categoryService.getCategories();
    const sortedCategories =
      categories?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
    setCategories(sortedCategories);
  };

  useEffect(() => {
    updateCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, updateCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
