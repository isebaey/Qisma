import React from "react";
import axios from "axios";
import Slider from "react-slick";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "./Home.css";
import { useQuery } from "react-query";
import Products from "../Products/Products";
import { Helmet } from "react-helmet";

// Import images
import a1 from "../../../Assets/a1.jpg";
import a2 from "../../../Assets/a2.jpg";
import a3 from "../../../Assets/a3.jpg";
import a4 from "../../../Assets/a4.jpg";
import a5 from "../../../Assets/a5.jpg";
import thumbnail from "../../../Assets/thumbnail.jpg";

const images = [a1, a2, a3, a4, a5];

const Home = () => {
  const fetchCategories = async () => {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return response.data.data;
  };

  const { data: categories, isLoading } = useQuery(
    "categories",
    fetchCategories
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const categorySliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <div className="vh-100 background-image d-flex justify-content-center align-items-center">
          <PropagateLoader color="#000000" />
        </div>
      ) : (
        <div className="overflow-hidden">
          <div
            className="vh-100 text-dark d-flex flex-column justify-content-center align-items-start "
            style={{
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              textAlign: "center",
              padding: "50px",
            }}
          >
            <h1 className="fw-bolder display-4 my-4 ps-5">
              Welcome to Qisma Store
            </h1>
            <p className=" fs-4 ps-5">
              Discover a wide range of high-quality products for every need.
            </p>
            <Link
              to="/products"
              className="btn btn-lg btn-dark mt-3 p-2 px-3 ms-5"
            >
              Shop Now
            </Link>
          </div>
          <Slider
            {...sliderSettings}
            className="mb-1 mt-4"
            style={{ height: "500px" }}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  style={{ height: "500px", width: "100%", objectFit: "cover" }}
                  alt={`product${index + 1}`}
                />
              </div>
            ))}
          </Slider>
          <Slider {...categorySliderSettings}>
            {categories.map((category) => (
              <div className="px-2" key={category._id}>
                <Link
                  to={`/categories/${category._id}`}
                  className="text-decoration-none"
                >
                  <div className="card mt-4 border-0">
                    <img
                      src={category.image}
                      className="w-100"
                      alt={category.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <p className="h3 mt-2 text-center text-decoration-none text-capitalize text-dark">
                    {category.slug}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
          <Products />
          <div
            className="container mx-auto m-5 p-5"
            style={{ height: "300px" }}
          >
            <div className=" mt-5  ">
              <h3 className="mb-3">Subscribe to Our Newsletter</h3>
              <form className="row gx-3 ">
                <div className="col-md-8">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-dark w-100">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Helmet>
        <title>Qisma Store</title>
      </Helmet>
    </>
  );
};

export default Home;
