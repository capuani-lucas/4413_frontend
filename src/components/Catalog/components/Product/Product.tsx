import React from "react";
import "./Product.scss";
import { Product as ProductType } from "service/catalogAPI";
import { useNavigate } from "react-router-dom";
import { useAddProductToCart } from "components/Catalog/hooks/useAddProductToCart";

type ProductProps = {
  product: ProductType;
}

const Product: React.FunctionComponent<ProductProps> = ({ product }) => {

  const navigate = useNavigate();
  const {addProductToCart, isLoading } = useAddProductToCart();

  return (
    <div className="product">
      <div className="product__top">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product__bottom">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p>{product.stock} left!</p>
        <p>Category: {product.category.name}</p>
        <p>Brand: {product.brand.name}</p>
        <div className="product__bottom__buttons">
          <button
            className="product__bottom__buttons__add"
            onClick={() => addProductToCart(product.id, 1)}
            disabled={isLoading || product.stock === 0}
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
          <button
            className="product__bottom__buttons__view"
            onClick={() => navigate(`/catalog/${product.id}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
