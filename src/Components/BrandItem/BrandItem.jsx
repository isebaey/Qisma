import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import "./BrandItem.css";
import { Helmet } from "react-helmet";

function BrandItem() {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrand() {
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
        );
        setBrand(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    }
    fetchBrand();
  }, [brandId]);

  return (
    <>
      <div className="brand-item-container mt-5 pt-5">
        <Helmet>{brand && <title>{brand.name}</title>}</Helmet>
        {loading ? (
          <div className="brand-item-loader">
            <PropagateLoader color="#000000" />
          </div>
        ) : (
          <div className="brand-item-details">
            <h3 className="brand-item-name">{brand.name}</h3>
            <p className="brand-item-description">{brand.description}</p>
            <img
              src={brand.image}
              alt={brand.name}
              className="brand-item-image"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default BrandItem;
