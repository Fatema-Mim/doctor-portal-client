import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../hooks/useToken";

const Signup = () => {
  const [sigiUpError, setSignUpError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate()
  const { createUser, updateUser } = useContext(AuthContext);
  const[createUserEmail,setCreateUserEmail]=useState('');
  const [token] = useToken(createUserEmail)

  if(token){
    navigate('/')
  }

  const handleSignIn = (data) => {
    console.log(data);
    setSignUpError(" ");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("User created Successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message);
      });
  };
  const saveUser = (name, email) =>{
    const user ={name, email};
    fetch('https://doctor-server-alpha.vercel.app/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data =>{
      setCreateUserEmail(email)
    })
}

  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Signup</h2>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p role="alert" className="text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
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
          </div>

          <input
            className="btn btn-accent w-full mt-3"
            value="Sign Up"
            type="submit"
          />
        </form>
        <p className="mt-3">
          Have an account ?{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
        {sigiUpError && <p className="text-red-400 text-sm">{sigiUpError}</p>}
        
      </div>
    </div>
  );
};

export default Signup;
