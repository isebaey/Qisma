import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

function Categories() {
  // Define a function to fetch categories
  const fetchCategories = async () => {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return response.data.data;
  };

  // Use useQuery hook to fetch categories and cache them
  const { data: categories, isLoading } = useQuery(
    "categories",
    fetchCategories
  );

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container my-4">
        <h2 className="text-center mb-5 text-dark">Explore Categories</h2>
        <div className="row g-4">
          {isLoading ? (
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <PropagateLoader color="#000000" />
            </div>
          ) : (
            categories.map((category) => (
              <div className="col-md-4" key={category._id}>
                <Link
                  to={`/categories/${category._id}`}
                  className="text-decoration-none"
                >
                  <div className="card shadow">
                    <img
                      src={category.image}
                      className="card-img-top img-fluid rounded"
                      alt={category.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{category.name}</h5>
                      <p className="card-text">{category.slug}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Categories;
