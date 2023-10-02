import React, { useEffect, useState } from "react";
import "./MyOrderPage.css";
import Table from "../Common/Table";
import apiClient from "../../utils/api-client";
import Loader from "./../Common/Loader";

const MyOrderPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/order")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const getProductString = (order) => {
    const productStringArr = order.products.map(
      (p) => `${p.product.title}(${p.quantity})` //this return array of string
    );

    return productStringArr.join(", ");
  };

  return (
    <section className="align_center myorder_page">
      {isLoading && <Loader />}
      {error && <h5 className="form_error">{error}</h5>}
      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getProductString(order)}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrderPage;
