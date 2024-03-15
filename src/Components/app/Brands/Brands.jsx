import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        setBrands(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }
    fetchBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="container-fluid my-4 px-5">
        <h2 className="text-center mb-5 text-dark mt-5 pt-5">Explore Brands</h2>
        <div className="row g-4">
          {loading ? (
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <PropagateLoader color="#000000" />
            </div>
          ) : (
            brands.map((brand) => (
              <div className="col-md-3" key={brand._id}>
                <Link
                  to={`/brands/${brand._id}`}
                  className="text-decoration-none"
                >
                  <div className="card h-100 shadow">
                    <img
                      src={brand.image}
                      className="card-img-top img-fluid"
                      alt={brand.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{brand.name}</h5>
                      <p className="card-text">{brand.description}</p>
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

export default Brands;
