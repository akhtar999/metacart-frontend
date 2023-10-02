import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

//so, first of all, using z method, we create our validation schema,
//which is a set of rules for form field then using zod resolver,
//we can apply this scehma to our react hook form.
//so when we have errors, it will directly add to react hook form error.

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (formdata) => {
    try {
      await login(formdata);
      const { state } = location;
      window.location = state ? state.form : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login form</h2>
        <div className="form_input">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="form_text_input"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            {errors.email && (
              <h5 className="form_error">{errors.email.message}</h5>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter Your password"
              {...register("password")}
            />
            {errors.password && (
              <h5 className="form_error">{errors.password.message}</h5>
            )}
          </div>
          {formError && <h5 className="form_error">{formError}</h5>}
          <button type="submit" className="add_cart form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
