import React from "react";
import "./Product.scss";
import { Product as ProductType } from "service/catalogAPI";
import { cartApi, useAddToCartMutation } from "service/cartApi";
import { toast } from "react-toastify";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";

type ProductProps = {
  product: ProductType;
}

const Product: React.FunctionComponent<ProductProps> = ({ product }) => {

  const [addToCart, result] = useAddToCartMutation();

  const dispatch = useDispatch<AppDispatch>();

  const addProductToCart = () => {
    addToCart({ product: product.id, quantity: 1 })
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error.data.error, {
            position: "bottom-right"
          });
        }
        else {
          dispatch(cartApi.endpoints.getCart.initiate(undefined, { forceRefetch: true }));
          toast.success('Product added to cart', {
            position: "bottom-right"
          });

        }
      })
  }

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
        <button
          className="product__bottom__add"
          onClick={addProductToCart}
          disabled={result.isLoading || product.stock === 0}
        >
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

export default Product;
