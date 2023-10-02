import React, { useEffect, useState } from "react";
import "./FeaturedProduct.css";
import ProductCard from "../Products/ProductCard";
import apiClient from "../../utils/api-client";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";
import Skeleton from "react-loading-skeleton";

const FeaturedProduct = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/products/featured")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  console.log(product);
  return (
    <section className="featured_products">
      <h2>Featured Product</h2>
      <div className="align_center featured_product_list">
        {error && <h5 className="form_error">{error}</h5>}

        {product.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
