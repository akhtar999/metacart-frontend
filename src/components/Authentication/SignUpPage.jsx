import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./SignUpPage.css";
import user from "../../assets/user.png";
import { getUser, signup } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must contain at least 3 characters" }),
    email: z
      .string()
      .email({ message: "Please enter valid email address" })
      .min(3),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" }),
    confirmPassword: z.string().min(6),
    deliveryAddress: z.string().min(4, {
      message: "Delivery address must contain at least 3 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password Mismatch",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formdata) => {
    try {
      await signup(formdata, profilePic);

      window.location = "/";
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
      <form
        className="authentication_form signup_form "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Signup form</h2>
        {/* image Upload */}
        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="image_input"
          />
        </div>
        {/* form input */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form_text_input"
              placeholder="Enter Your name"
              {...register("name")}
            />
            {errors.name && (
              <h5 className="form_error">{errors.name.message}</h5>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form_text_input"
              placeholder="Enter confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <h5 className="form_error">{errors.confirmPassword.message}</h5>
            )}
          </div>
          <div className="signup_textares_section">
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <textarea
              type="text"
              id="deliveryAddress"
              className="input_textarea"
              placeholder="Enter Your Delivery address"
              {...register("deliveryAddress")}
            />
            {errors.deliveryAddress && (
              <h5 className="form_error">{errors.deliveryAddress.message}</h5>
            )}
          </div>
        </div>
        {formError && <h5 className="form_error">{formError}</h5>}

        <button type="submit" className="add_cart form_submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignUpPage;
