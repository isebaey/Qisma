import axios from "axios";
import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistProvider(props) {
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
  };

  async function getWishlistCount() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const wishlistCount = response.data.data.length;
      console.log(wishlistCount);
      return wishlistCount;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistCount, updateWishlistCount, getWishlistCount }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
