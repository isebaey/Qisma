import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import "./CategoryItem.css";
import { Helmet } from "react-helmet";

function CategoryItem() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
        );
        setCategory(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
    fetchCategory();
  }, [categoryId]);

  return (
    <>
      <Helmet>{category && <title>{category.name}</title>}</Helmet>

      <div className="category-item-container">
        {loading ? (
          <div className="category-item-loader">
            <PropagateLoader color="#000000" />
          </div>
        ) : (
          <div className="category-item-details">
            <h3 className="category-item-name">{category.name}</h3>
            <p className="category-item-slug">{category.slug}</p>
            <img
              src={category.image}
              alt={category.name}
              className="category-item-image"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryItem;
