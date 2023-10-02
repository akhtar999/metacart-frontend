import React, { useEffect, useState, useContext } from "react";
import "./CartPage.css";
import Usercontext from "../../contexts/UserContexts";

import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import Cartcontext from "../../contexts/CartContexts";
import { checkOutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const [subtotal, setSubtotal] = useState(0);
  const user = useContext(Usercontext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(Cartcontext);

  console.log(user);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    setSubtotal(total);
  }, [cart]);

  const checkOut = () => {
    const oldCart = [...cart];
    setCart([]);
    checkOutAPI()
      .then(() => {
        toast.success("Order placed Successfully");
      })
      .catch(() => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
  };

  console.log(cart);
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>
      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  CartPage={true}
                  productId={product._id}
                />
              </td>
              <td>{quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subtotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="add_cart checkout_button" onClick={checkOut}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
