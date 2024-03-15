import React, { useContext } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery, useQueryClient } from "react-query";
import { CartContext } from "../../../Context/CartContext";
import { WishlistContext } from "../../../Context/WishlistContext";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlistCount, updateWishlistCount } = useContext(WishlistContext);

  const fetchWishlist = async () => {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  };

  const {
    data: wishlistItems,
    isLoading,
    refetch,
  } = useQuery("wishlist", fetchWishlist);

  const queryClient = useQueryClient();

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      updateWishlistCount(wishlistCount - 1);
      toast.success("Product deleted from wishlist successfully!");
      await refetch();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      removeFromWishlist(productId);
      await refetch();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="container my-5 pt-1">
        <h2 className="mb-4 mt-5">Wishlist</h2>
        {isLoading ? (
          <div className="loader-container d-flex align-items-center justify-content-center">
            <PropagateLoader color="#000000" />
          </div>
        ) : (
          <>
            {wishlistItems.length === 0 ? (
              <p>Your wishlist is empty</p>
            ) : (
              <div className="row g-4">
                {wishlistItems.map((item) => (
                  <div key={item._id} className="col-md-4 mx-auto">
                    <div className="product p-2 shadow-sm pb-4">
                      <Link to={`/products/${item._id}`}>
                        <img
                          src={item.imageCover}
                          className="card-img-top"
                          alt={item.title}
                          style={{ width: "300px" }}
                        />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link
                            to={`/products/${item._id}`}
                            className="text-decoration-none text-dark"
                          >
                            {item.title.split(/\s+/).slice(0, 2).join(" ")}
                          </Link>
                        </h5>
                        <p className="card-text">
                          Category: {item.category.name}
                        </p>
                        <div className="product-buttons">
                          <button
                            onClick={() => handleAddToCart(item.id)}
                            className="add-to-cart-btn w-75"
                          >
                            Add to Cart
                          </button>
                          <i
                            className=" fa-regular fa-trash-can fa-xl text-danger delete-icon me-2"
                            onClick={() => removeFromWishlist(item._id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-5 text-bg-light mt-5">
                  <p className="fs-3 fw-medium">Continue shopping</p>
                  <p>
                    Before placing a new order, take a moment to explore our
                    collection of products. You might find something else you
                    love!
                  </p>
                  <Link to={"/products"} className="btn btn-warning">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
