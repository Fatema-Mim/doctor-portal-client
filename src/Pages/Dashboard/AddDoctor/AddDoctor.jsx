import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Shared/Loading";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const imageHostKey = "802dc61ebe79a80cb94f98b8acd087c5";

  console.log(imageHostKey);
  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch("https://doctor-server-alpha.vercel.app/appointmentSpecialty");
      const data = await res.json();
      return data;
    },
  });

  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url,
          };

          // save doctor information to the database
          fetch("https://doctor-server-alpha.vercel.app/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is added successfully`);
              navigate("/dashboard/managedoctors");
            });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className=" flex justify-center items-center">
      <div className=" p-7 mt-10">
        <h2 className="text-3xl">Add A Doctor</h2>
        <form onSubmit={handleSubmit(handleAddDoctor)}>
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
              <span className="label-text">Specialty</span>
            </label>
            <select
              {...register("specialty")}
              className="select input-bordered w-full max-w-xs "
            >
              <option disabled selected>
                Select a option
              </option>
              {specialties.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "Photo is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Add Doctor"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
