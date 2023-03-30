import React from "react";

const Contact = () => {
  return (
    <div className="bg-contact bg-no-repeat bg-center bg-cover py-10">
      <div className="text-center">
        <h3 className="text-xl font-bold text-primary uppercase">Contact Us</h3>
        <h2 className="text-3xl text-white">Stay connected with us</h2>
      </div>
      <div className="space-y-4 mt-16">
        <div className="text-center">
          <input
            type="email"
            placeholder="Email Address"
            className="input w-full max-w-xs"
          />
        </div>
        <div className="text-center">
          <input
            type="text"
            placeholder="Subject"
            className="input w-full max-w-xs "
          />
        </div>
        <div className="text-center w-full">
          <textarea className="textarea" rows="3" cols="41" placeholder="Your Message"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Contact;
