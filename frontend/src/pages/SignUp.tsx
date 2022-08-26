import useAuth from "#/hooks/useAuth";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const SignUp: React.FC = () => {
  const { signUp } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password1: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password1"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => signUp.mutate(values),
  });

  return (
    <div className="container mt-3">
      <h1>Sign up and create your new account!</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={`form-control ${formik.touched.username && formik.errors.username && "border-danger"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger">{formik.errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${formik.touched.email && formik.errors.email && "border-danger"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password1"
                id="password1"
                className={`form-control ${formik.touched.password1 && formik.errors.password1 && "border-danger"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password1}
              />
              {formik.touched.password1 && formik.errors.password1 && (
                <div className="text-danger">{formik.errors.password1}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                id="password2"
                className={`form-control ${formik.touched.password2 && formik.errors.password2 && "border-danger"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password2}
              />
              {formik.touched.password2 && formik.errors.password2 && (
                <div className="text-danger">{formik.errors.password2}</div>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
          Sign Up
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
