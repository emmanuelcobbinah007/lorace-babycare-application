import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

interface LoginFormProps {
  setUser: (user: any) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  showLoginForm: () => void;
  showForgotPassword: () => void;
}

const NEXT_PUBLIC_ROOT_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const LoginForm: React.FC<LoginFormProps> = ({ setUser, setLoggedIn, showLoginForm, showForgotPassword }) => {

  const router = useRouter();

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // console.log("Form data", values);

          const user = {
            email: values.email,
            password: values.password,
          };

          const makeRequest = async () => {
            try {
              const response = await axios.post(`${NEXT_PUBLIC_ROOT_URL}/api/auth/login`, user);
              
              if (response.data.user.role === "ADMIN") {
                router.push("/admin");
                return;
              }

              await setUser(response.data.user);
              setLoggedIn(true);

              console.log(response);
            } catch (error) {
              if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data.error || "An error occurred";
                toast.error(errorMessage, {
                  position: "top-right",
                  autoClose: 3000,
                });
              } else {
                toast.error("An unexpected error occurred", {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
              console.error("Error during login:", error);
            }
          }

          await makeRequest();
          setSubmitting(false);
          showLoginForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-[500]"
              >
                Email <span className="text-[#4fb3e5]">*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 font-[500]"
              >
                Password <span className="text-[#4fb3e5]">*</span>
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md hover:ring-[#a4c745] focus:ring-[#a4c745] focus:border-[#a4c745] sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <p
              className="text-sm text-gray-600 hover:text-[#4fb3e5] underline hover:cursor-pointer duration-300"
              onClick={() => {
                showForgotPassword();
              }}
            >
              Forgot Password?
            </p>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? "bg-[#b3def2]" : "bg-black"} text-white py-2 px-4 rounded-2xl hover:bg-[#4fb3e5] focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] focus:ring-offset-2 duration-300 hover:cursor-pointer my-4`}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p
        className="text-sm text-gray-600 hover:text-[#4fb3e5] underline hover:cursor-pointer duration-300"
        onClick={() => {
          showLoginForm();
        }}
      >
        You&apos;re new around here? Create an account.
      </p>
    </div>
  );
};

export default LoginForm;
