import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cartApi, useAddToCartMutation } from "service/cartApi";
import { AppDispatch } from "store";

export const useAddProductToCart = () => {

  const [addToCart, result] = useAddToCartMutation();
  const dispatch = useDispatch<AppDispatch>();

  const addProductToCart = (productId: number, quantity: number) => {

    if (!quantity) {
      return
    }

    addToCart({ product: productId, quantity })
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

  return {
    addProductToCart,
    isLoading: result.isLoading
  };
}