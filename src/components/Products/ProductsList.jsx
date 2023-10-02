import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import apiClient from "../../utils/api-client";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
// import { object } from "zod";
// import Pagination from "../Common/Pagination";

const ProductsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortedProduct, setSortedProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  // const [search, setSearch] = useSearchParams();
  // const category = search.get("category");
  // const page = search.get("page");
  // const searchQuery = search.get("search");
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/products", {
        // params: {
        //   // search: searchQuery,
        //   category,
        //   perPage: 24,
        //   page,
        // },
      })
      .then((res) => {
        setProducts(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [category, page]);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({
  //     ...currentParams,
  //     page: page,
  //   });
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, clientHeight, scrollHeight } =
  //       document.documentElement;
  //     if (scrollTop + clientHeight >= scrollHeight - 1) {
  //       console.log("reached to bottom !");
  //       handlePageChange();
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  // }, []);
  useEffect(() => {
    if (products) {
      if (sortBy === "price desc") {
        setSortedProduct(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "price asc") {
        setSortedProduct(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "rate desc") {
        setSortedProduct(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProduct(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else {
        setSortedProduct(products);
      }
    }
  }, [sortBy, products]);
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price - HIGH to LOW</option>
          <option value="price asc">Price - LOW to HIGH</option>
          <option value="rate desc">Rate - HIGH to LOW</option>
          <option value="rate asc">Rate - LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error && <h5 className="form_error">{error}</h5>}
        {isLoading
          ? skeleton.map((n) => <ProductCardSkeleton key={n} />)
          : sortedProduct.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default ProductsList;
