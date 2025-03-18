"use client";
import { useState, useEffect } from "react";
import { Filter, Search, ShoppingBag, X } from "lucide-react";
import { FilterModal } from "@/components/filter/filter-modal/FilterModal";
import { searchProducts } from "@/actions/search-products";
import { Product } from "@/interfaces";
import Link from "next/link";

interface Props {
  onSearch: (query: string) => void;
  onApplyFilters: (filters: {
    cantidadMinima?: number;
    fechaCreacion?: string;
  }) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}

export const Navbar = ({
  onSearch,
  onApplyFilters,
  hasFilters,
  onClearFilters,
}: Props) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchText.trim() === "") {
        setSuggestions([]);
        return;
      }
      try {
        const results = await searchProducts(searchText);
        setSuggestions(results);
      } catch (error) {
        console.error("Error obteniendo sugerencias:", error);
      }
    };

    fetchSuggestions();
  }, [searchText]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchText(product.nombre);
    onSearch(product.nombre);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
    setSuggestions([]);
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl flex justify-between items-center py-3 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg rounded-2xl z-50">
        <Link href="/">
        
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-gray-800 dark:text-white tracking-wider">
          <ShoppingBag size={28} className="text-blue-600 dark:text-blue-400" />
          Gusta-shop
        </h1>
        </Link>

        <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full shadow-md w-2/5">
          <Search size={20} className="text-gray-500 dark:text-gray-300 mr-2" />
          <input
            type="text"
            placeholder="Buscar productos por nombre o código..."
            value={searchText}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full px-4 py-2 bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
          />

          {searchText && (
            <button
              onClick={clearSearch}
              className="ml-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition"
            >
              <X size={18} />
            </button>
          )}

          <button
            className="text-gray-500 dark:text-gray-300 ml-3 cursor-pointer hover:text-gray-700 dark:hover:text-white transition"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Filter size={20} />
          </button>
          {hasFilters && (
            <button
              onClick={onClearFilters}
              className="ml-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition flex items-center gap-1"
            >
              <X size={18} />
              <span className="text-sm">Quitar Filtros</span>
            </button>
          )}

          {isFocused && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg mt-1 overflow-hidden z-50">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-white"
                >
                  {product.nombre}{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    (# {product.id})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};
