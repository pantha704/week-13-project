import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Form = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const [t, setT] = useState(type);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const url = `${BACKEND_URL}/api/v1/user/${
        t == "signup" ? "signup" : "signin"
      }`;
      console.log(url);
      const data =
        t == "signup"
          ? {
              name: form.name || "Anon",
              username: form.email,
              password: form.password,
            }
          : { username: form.email, password: form.password };
      console.log(data);
      const response = await axios.post(url, data);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const heading = t == "signup" ? "Create an account" : "Sign In";
  const subHeading =
    t == "signup" ? "Already have an account?" : "Don't have an account?";

  return (
    <div className="items-center justify-center text-center h-screen flex flex-col">
      <div>
        <h1 className="font-bold text-4xl">{heading}</h1>
        <div className="pt-4 text-slate-500">
          {subHeading}
          <span
            className="underline pl-2 cursor-pointer"
            onClick={() => setT(t == "signup" ? "signin" : "signup")}
          >
            {t == "signup" ? "Sign In" : "Sign Up"}
          </span>
        </div>
        <form className="pt-8 w-82 mx-auto gap-1 flex flex-col">
          {t == "signup" ? (
            <LabelledInput
              id="name"
              label="Full Name"
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          ) : null}
          <LabelledInput
            id="email"
            label="Username / Email"
            type="text"
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <LabelledInput
            id="password"
            label="Password"
            type="password"
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />
          {/* Add your submit button and logic here */}
          <Button
            className="w-full mt-4"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              // Handle form submission logic here
              console.log("button cwicked");
              await sendRequest();
              // setForm({
              //   name: "",
              //   email: "",
              //   password: "",
              // });
              // console.log("Form submitted:", form);
            }}
          >
            {t === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  id: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

const LabelledInput = ({
  id,
  label,
  onChange,
  type = "text",
}: LabelledInputProps) => {
  return (
    <div className="relative w-full my-2">
      <input
        type={type}
        id={id}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};
