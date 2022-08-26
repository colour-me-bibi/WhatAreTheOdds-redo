import useAuth from "#/hooks/useAuth";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
    }),
    onSubmit: (values) => signIn.mutate(values),
  });

  return (
    <div className="container mt-3">
      <h1>Sign in to access your account!</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="row row-cols-1">
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${formik.touched.password && formik.errors.password && "border-danger"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          // disabled={formik.isSubmitting}
        >
          Log In
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default SignIn;
