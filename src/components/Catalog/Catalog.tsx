import React, { useState } from "react";
import "./Catalog.scss";
import Filter from "./components/Filter/Filter";
import { useGetProductsQuery } from "service/catalogAPI";
import Product from "./components/Product/Product";

export type CatalogFilters = {
  brand?: string;
  category?: string;
  sort_by?: string;
  search?: string;
}

const Catalog: React.FunctionComponent = () => {


  const [filters, setFilters] = useState<CatalogFilters>({});
  const { data, isLoading, error } = useGetProductsQuery(filters);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;


  return (
    <div className="catalog">
      <h1>Catalog</h1>

      
      <Filter 
        filters={filters}
        setFilters={setFilters}
      />
      <div className="catalog__products">
        {
          data?.catalog.map((product) => (
            <div key={`product-catalog-${product.id}`}>
              <Product 
                product={product}
              />
            </div>
          ))   
        }
      </div>


    </div>
  );
}

export default Catalog;