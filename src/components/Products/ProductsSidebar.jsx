import React, { useEffect, useState } from "react";
import "./ProductsSidebar.css";
import Links from "../Navbar/Links";
import apiClient from "../../utils/api-client";

const ProductsSidebar = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/category")
      .then((res) => setCategory(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <h5 className="form_error">{error}</h5>}
        {category.map((item) => (
          <Links
            key={item._id}
            id={item._id}
            title={item.name}
            link={`/products?category=${item.name}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
