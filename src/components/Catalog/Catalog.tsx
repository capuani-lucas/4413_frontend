import React, { useState } from "react";
import "./Catalog.scss";
import Filter from "./components/Filter/Filter";
import { useGetProductsQuery } from "service/catalogAPI";
import Product from "./components/Product/Product";
import {
  Box,
  Text
} from "@chakra-ui/react";

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
    <Box>
    <Text fontSize="2xl" fontWeight="bold" textAlign="center">Catalog</Text>
    <Filter 
      filters={filters}
      setFilters={setFilters}
    />
    <Box className="catalog__products">
      {data?.catalog.map((product) => (
        <Box key={`product-catalog-${product.id}`}>
          <Product product={product} />
        </Box>
      ))}
    </Box>
  </Box>
  );
}

export default Catalog;