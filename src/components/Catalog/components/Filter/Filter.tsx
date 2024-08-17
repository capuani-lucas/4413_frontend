import React from "react";
import "./Filter.scss";
import { useGetBrandsQuery, useGetCategoriesQuery } from "service/catalogAPI";
import { useDispatch } from "react-redux";
import { catalogApi } from "service/catalogAPI";
import { AppDispatch } from "store";
import { CatalogFilters } from "components/Catalog/Catalog";
import { useFilter } from "./hooks/useFilter";

export type RefetchProductsType = ReturnType<typeof catalogApi.endpoints.getProducts.initiate>;
type FilterProps = {
  filters: CatalogFilters;
  setFilters: React.Dispatch<React.SetStateAction<CatalogFilters>>;
}

const Filter: React.FunctionComponent<FilterProps> = ({ filters, setFilters }) => {

  const { 
    data: categoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError, 
  } = useGetCategoriesQuery();

  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError,
  } = useGetBrandsQuery();

  const {
    handleSearchChange, 
    handleBrandChange, 
    handleCategoryChange, 
    handleSortChange
  } = useFilter(filters, setFilters);

  if (categoriesLoading || brandsLoading) return <div>Loading...</div>;
  if (categoriesError || brandsError) return <div>Error</div>

  return (
    <div className="filter">
      
      <div>
        <p>Category</p>
        <select
          onChange={handleCategoryChange}
        >
          <option value="0">All</option>
          {
            categoriesData?.categories.map((category) => (
              <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>

      <div>
        <p>Brand</p>
        <select
          onChange={handleBrandChange}
        >
          <option value="0">All</option>
          {
            brandsData?.brands.map((brand) => (
              <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
            ))
          }
        </select>
      </div>

      <div>
        <p>Sort by</p>
        <select
          onChange={handleSortChange}
        >
          <option value="0">None</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div>
        <p>Search</p>
        <input 
          type="text" 
          onChange={handleSearchChange}
        />
      </div>

    
    </div>
  );
}

export default Filter;