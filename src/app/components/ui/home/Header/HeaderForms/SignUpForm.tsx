import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface SignUpFormProps {
  showLoginForm: () => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: any) => void;
}

const NEXT_PUBLIC_ROOT_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const SignUpForm: React.FC<SignUpFormProps> = ({ showLoginForm, setLoggedIn, setUser }) => {
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
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
          phone: Yup.string()
            .required("Phone number is required")
            .matches(/^\+\d{10,15}$/, "Invalid phone number"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const user = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            phone: values.phone,
            password: values.password,
          };

          const makeRequest = async () => {
            try {
              const response = await axios.post(
                `${NEXT_PUBLIC_ROOT_URL}/api/auth/signup`,
                user
              );
              console.log(response);
              if (response.status === 201) {
                toast.success("User registered successfully", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }

              await setUser(response.data.user);
              setLoggedIn(true);
            } catch (err) {
              if (axios.isAxiosError(err) && err.response?.status === 409) {
                toast.error("Email already exists", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                console.log(err);
                toast.error("An error occurred during signup", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
          };

          await makeRequest();

          // Reset form values after submission
          values.firstname = "";
          values.lastname = "";
          values.email = "";
          values.phone = "";
          values.password = "";

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm text-gray-700 font-[500]"
              >
                First Name
              </label>
              <Field
                type="text"
                id="firstname"
                name="firstname"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="firstname"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm text-gray-700 font-[500]"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="lastname"
                name="lastname"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="lastname"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-[500]"
              >
                Email <span className="text-[#b970a0]">*</span>
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
                htmlFor="phone"
                className="block text-sm text-gray-700 font-[500]"
              >
                Phone Number <span className="text-[#b970a0]">*</span>
              </label>
              <Field name="phone">
                {({ field, form }: any) => (
                  <PhoneInput
                    international
                    defaultCountry="GH"
                    value={field.value}
                    onChange={(value) => form.setFieldValue("phone", value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </Field>
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 font-[500]"
              >
                Password <span className="text-[#b970a0]">*</span>
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

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? "bg-[#dcaed0]" : "bg-black"} text-white py-2 px-4 rounded-2xl hover:bg-[#b970a0] focus:outline-none focus:ring-2 focus:ring-[#b970a0] focus:ring-offset-2 duration-300 hover:cursor-pointer my-4`}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p
        className="text-sm text-gray-600 hover:text-[#b970a0] underline hover:cursor-pointer duration-300"
        onClick={() => {
          showLoginForm();
        }}
      >
        Already have an account? Login Here.
      </p>
    </div>
  );
};

export default SignUpForm;
