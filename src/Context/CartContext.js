import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState(null);
  const [orders, setOrders] = useState(null);
  const userId = localStorage.getItem("userId");

  async function fetchCartData() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCartData(response.data.data);
      setCartId(response.data.data._id);
      setLoading(false);
      return response.data.data.products.length;
    } catch (error) {
      console.log("fetchCartData:", error);
    }
  }

  async function getOrders() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting orders:", error);
      setLoading(false);
    }
  }

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("productId:", productId);
      console.error("Error adding product to cart:", error);
    }
  };

  async function clearCart() {
    try {
      const response = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartData(response.data.data);
      toast.success("Cart deleted");
    } catch (error) {
      console.error("Error deleteing cart:", error);
    }
  }

  const updateQuantity = async (productId, count) => {
    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.error("productId:", productId);
      console.error("Error adding product to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Product remove from cart successfully!");
    } catch (error) {
      console.error("productId:", productId);
      console.error("Error removeing product from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartId,
        userId,
        loading,
        fetchCartData,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setOrders,
        orders,
        getOrders,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
