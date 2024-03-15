import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import "./Product.css";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function Product() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [changeBtn, setChangeBtn] = useState("Add to Cart");
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    return response.data.data;
  };

  const { data: product, isLoading } = useQuery(["product", id], fetchProduct);

  const handleButtonClick = async () => {
    try {
      if (changeBtn === "Add to Cart") {
        await addToCart(id);
        setChangeBtn("✅ View in Cart");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <PropagateLoader color="#000000" />
        </div>
      ) : (
        <main className="p-5 vh-100">
          <div className="container mt-5 pt-5">
            <div className="row product-container ">
              {product && (
                <>
                  <div className="col-md-4">
                    <Slider {...settings}>
                      {product.images.map((image) => (
                        <img
                          src={image}
                          alt={product.title}
                          key={product.id}
                        ></img>
                      ))}
                    </Slider>
                    <Helmet>
                      <title>{product.title}</title>
                    </Helmet>
                  </div>
                  <div className="col-md-8 d-flex justify-content-center flex-column">
                    <h2 className="product-title">{product.title}</h2>
                    {product.category && (
                      <p className="product-category">
                        {product.category.name}
                      </p>
                    )}
                    <p className="product-price">{product.price} £</p>
                    <h5 className="product-description">Description</h5>
                    <p>{product.description}</p>
                    <button
                      onClick={handleButtonClick}
                      className="product-button btn btn-dark w-75"
                    >
                      {changeBtn}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
