import React, { useState } from "react"
import { RefetchProductsType } from "../Filter";
import { CatalogFilters } from "components/Catalog/Catalog";

export const useFilter = (
  filters: CatalogFilters,  
  setFilters: React.Dispatch<React.SetStateAction<CatalogFilters>>
) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      category: value === "0" ? undefined : value
    }))
  }

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      brand: value === "0" ? undefined : value
    }))
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      sort_by: value === "0" ? undefined : value
    }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      search: value === "" ? undefined : value
    }))
  }

  return {
    handleCategoryChange,
    handleBrandChange,
    handleSortChange,
    handleSearchChange,
  }


}
