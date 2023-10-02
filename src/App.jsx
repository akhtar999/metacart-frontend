import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Usercontext from "./contexts/UserContexts";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Authentication/Routing/Routing";
import { getJwt, getUser, logout } from "./services/userServices";
import setAuthToken from "./setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getUserAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import Cartcontext from "./contexts/CartContexts";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser(); // this will return user object
      if (Date.now() >= jwtUser.exp * 1000) {
        logout();
        Location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    //API
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Succesfully !");
      })
      .catch((err) => {
        toast.error("Faild to add Product");
        setCart(cart);
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);
    //API
    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);
      decreaseProductAPI().catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
  };

  const getCart = () => {
    getUserAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <Usercontext.Provider value={user}>
      <Cartcontext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" autoClose={2000} />
            <Routing />
          </main>
        </div>
      </Cartcontext.Provider>
    </Usercontext.Provider>
  );
};

export default App;
