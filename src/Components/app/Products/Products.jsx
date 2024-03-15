import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import "./Products.css";
import { AuthenticationContext } from "../../../Context/AuthenticationContext";
import { CartContext } from "../../../Context/CartContext";
import { WishlistContext } from "../../../Context/WishlistContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function Products() {
  const authContext = useContext(AuthenticationContext);
  const { token } = authContext;
  const { addToCart } = useContext(CartContext);
  const { wishlistCount, updateWishlistCount } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return response.data.data.map((product) => ({
      ...product,
      shortTitle: product.title.split(/\s+/).slice(0, 2).join(" "),
      isWishlist: false,
    }));
  };

  const { data: products, isLoading } = useQuery("products", fetchProducts);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
    } catch (error) {
      console.error("Error adding product to cart:", error, token);
    }
  };

  async function addToWishlist(productId) {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      updateWishlistCount(wishlistCount + 1);
      toast.success("Product added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  }

  const toggleWishlist = (productId) => {};

  const filteredProducts = products
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container my-5 pt-1">
        <div className="search-container mt-5 pt-4">
          <input
            type="text"
            placeholder="Search a product..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </button>
          )}
        </div>
        {isLoading ? (
          <div className="loader-container d-flex align-items-center justify-content-center">
            <PropagateLoader color="#000000" />
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((product) => (
                <div className="product-card p-3 " key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.imageCover}
                      className="product-image"
                      alt={product.title}
                    />
                  </Link>
                  <div className="product-details">
                    <h3 className="product-title">
                      <Link
                        to={`/products/${product.id}`}
                        className="product-link"
                      >
                        {product.shortTitle}
                      </Link>
                    </h3>
                    <p className="product-category">{product.category.name}</p>
                    <div className="price-and-ratings">
                      <div className="price-container">
                        {product.priceAfterDiscount ? (
                          <>
                            <span className="price-new">
                              {product.priceAfterDiscount} £
                            </span>
                            <span className="price-old">{product.price} £</span>
                          </>
                        ) : (
                          <span className="price-new">{product.price} £</span>
                        )}
                      </div>
                      <div className="ratings-container">
                        <i className="fa-solid fa-star perpelForMe"></i>
                        <span>{product.ratingsQuantity}</span>
                      </div>
                    </div>
                    <div className="product-buttons">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="add-to-cart-btn"
                      >
                        Add to Cart
                      </button>
                      <i
                        className={`fa-solid fa-heart wishlist-icon ${
                          product.isWishlist ? "active" : ""
                        }`}
                        onClick={() => {
                          toggleWishlist(product.id);
                          addToWishlist(product.id);
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
