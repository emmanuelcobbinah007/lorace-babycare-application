import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface ForgotPasswordProps {
  showLoginForm: () => void;
  showForgotPassword: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ showLoginForm, showForgotPassword }) => {
  return (
    <div>
        <p className="text-sm mb-4 text-gray-600">Forgot your password? No worries! Just enter the email linked to your account, and we’ll send you a link to reset it and get you back in.</p>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form data", values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-[500]"
              >
                Email <span className="text-[#a4c745]">*</span>
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-2 px-4 rounded-2xl hover:bg-[#a4c745] focus:outline-none focus:ring-2 focus:ring-[#a4c745] focus:ring-offset-2 duration-300 hover:cursor-pointer my-4"
              >
                Send Email
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p
        className="text-sm text-gray-600 hover:text-[#a4c745] underline hover:cursor-pointer duration-300"
        onClick={() => {
          showLoginForm();
        }}
      >
        Cancel.
      </p>
    </div>
  );
};

export default ForgotPassword;
