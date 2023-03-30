import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || "/";

  if(token){
    navigate(from ,{replace: true})
  }


  const handleLogin = (data) => {
    console.log(data);
    setLoginError('')
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setLoginUserEmail(data.email)
        
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };
  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="xyz@gmail.com"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p role="alert" className="text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 character or longer",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              type="password"
              placeholder="********"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p role="alert" className="text-red-500">
                {errors.password?.message}
              </p>
            )}

            <label className="label">
              <span className="label-text">Forget Password ?</span>
            </label>
          </div>
            
          <input
            className="btn btn-accent w-full"
            value="Login"
            type="submit"
          />
          {loginError && <p className="text-sm text-red-600">{loginError}</p> }
        </form>
        <p className="mt-3">
          New to Doctors Portal{" "}
          <Link className="text-secondary" to="/signup">
            Create new Account
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
