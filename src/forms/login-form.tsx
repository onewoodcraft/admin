"use client"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
import { notifyError, notifySuccess } from "@/utils/toast";
import { useLoginAdminMutation } from "@/redux/auth/authApi";
import ErrorMsg from "@/app/components/common/error-msg";
import Loading from "@/app/components/common/loading";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginAdmin] = useLoginAdminMutation();
  const router = useRouter();
  
  // react hook form
  const {register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: yupResolver(schema),
  });

  // onSubmit
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await loginAdmin({ email: data.email, password: data.password });
      
      if ("error" in res) {
        console.error("Login error:", res.error);
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            notifyError(errorData.message);
          } else {
            notifyError("Invalid email or password");
          }
        } else if ("status" in res.error) {
          if (res.error.status === "FETCH_ERROR") {
            notifyError("Unable to connect to the server. Please check your internet connection.");
          } else {
            notifyError("An error occurred during login. Please try again.");
          }
        }
      } else {
        notifySuccess("Login successful");
        router.push('/dashboard');
        reset();
      }
    } catch (error: any) {
      console.error("Login error:", error);
      notifyError(error?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Email <span className="text-red">*</span>
        </p>
        <input
          {...register("email", { required: `Email is required!` })}
          name="email"
          id="email"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="email"
          placeholder="Enter Your Email"
          disabled={isLoading}
        />
        <ErrorMsg msg={errors.email?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Password <span className="text-red">*</span>
        </p>
        <input
          {...register("password", { required: `Password is required!` })}
          id="password"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="password"
          placeholder="Password"
          disabled={isLoading}
        />
        <ErrorMsg msg={errors.password?.message as string} />
      </div>
      <div className="flex items-center justify-between">
        <div className="tp-checkbox flex items-start space-x-2 mb-3">
          <input id="product-1" type="checkbox" disabled={isLoading} />
          <label htmlFor="product-1" className="text-tiny">
            Remember Me
          </label>
        </div>
        <div className="mb-4">
          <a
            href="forgot.html"
            className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
          >
            Forgot Password ?
          </a>
        </div>
      </div>
      <button 
        type="submit" 
        className="tp-btn h-[49px] w-full justify-center relative"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading loading={true} spinner="fade" />
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
