import React, { useEffect, useState } from "react";
import "./ProductView.scss";
import { catalogApi, useGetProductQuery } from "service/catalogAPI";
import { useParams } from "react-router-dom";
import { useAddProductToCart } from "components/Catalog/hooks/useAddProductToCart";


const ProductView: React.FunctionComponent = () => {

  const { product_id } = useParams();
  const { data, error, isLoading } = useGetProductQuery(parseInt(product_id as string));

  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, isLoading: addLoading } = useAddProductToCart();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="productView">

      <h1>{data?.catalog.name} - ${data?.catalog.price}</h1>
      <div className="productView__top">
        <img src={data?.catalog.image_url} alt={data?.catalog.name} />
      </div>
      <div className="productView__bottom">
        <div>
          <h3>Description</h3>
          <p>{data?.catalog.description}</p>
        </div>
        <div className="productView__bottom__info">
          <div>
            <h3>Category</h3>
            <p>{data?.catalog.category.name}</p>
          </div>
          <div>
            <h3>Brand</h3>
            <p>{data?.catalog.brand.name}</p>
          </div>
          <div>
            <h3>Stock</h3>
            <p>{data?.catalog.stock}</p>
          </div>
        </div>

        <div className="productView__bottom__add">
          <h3>Quantity</h3>
          <input
            type="number"
            value={quantity || ""}
            onChange={(e) => setQuantity(e.target.valueAsNumber)}
          />
          <button
            onClick={() => {
              addProductToCart(parseInt(product_id as string), quantity);
            }}
            disabled={addLoading || data?.catalog.stock === 0}
          >
            {data?.catalog.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductView;