import React, { useContext, useEffect, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/api-client";
import Loader from "./../Common/Loader";
import Cartcontext from "../../contexts/CartContexts";
import Usercontext from "../../contexts/UserContexts";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProducts] = useState();
  const [error, setError] = useState("");
  const { addToCart } = useContext(Cartcontext);
  const user = useContext(Usercontext);

  useEffect(() => {
    apiClient
      .get(`/products/${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <>
      {product && (
        <section className="align_center single_product">
          {error && <h5 className="form_error">{error}</h5>}
          {/* {isLoading && <Loader />} */}
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h2 className="single_product_title">{product.title}</h2>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            {user && (
              <>
                {" "}
                <h2 className="quantity_title">Quantity:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>
                <button
                  className="add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SingleProductPage;
