import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <Formik
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={Yup.object({
            fullName: Yup.string().required("Full name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .matches(/[A-Z]/, "Must include an uppercase letter")
              .matches(/[a-z]/, "Must include a lowercase letter")
              .matches(/[0-9]/, "Must include a number")
              .matches(/[@$!%*#?&]/, "Must include a special character")
              .required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await signup(values);
            setSubmitting(false);
            navigate("/"); // redirect after signup
          }}
        >
          <Form>
            <div className="mb-2">
              <label className="block text-sm font-medium">Full Name</label>
              <Field
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-md p-2"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">Email Address</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-md p-2"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Enter a strong password"
                className="w-full border rounded-md p-2"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Create Account
            </button>
          </Form>
        </Formik>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}