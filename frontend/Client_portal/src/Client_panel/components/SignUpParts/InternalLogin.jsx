import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setadmin, setuser } from "../../../redux/AuthSlice";
import { ColorRing } from "react-loader-spinner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
const InternalLogin = () => {
  const FormFields = {
    displayName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminloading, setadminloading] = useState(false);
  const [fields, setfields] = useState(FormFields);
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const handleChange = (e) => {
    setfields((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const test = () => {
    console.log("hello");
  };
  const getadmin = async (id) => {
    const docRef = doc(db, "Roles", id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data(), id);

      if (!docSnap.data().isAdmin) {
        seterr(true);
      } else {
        dispatch(setadmin(docSnap.data().isAdmin));
        dispatch(setuser({ uid: id, name: docSnap.data().name }));
        navigate("/admin");
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const signinAdmin = (email, password) => {
    console.log(fields);
    if (fields.email.length !== 0 && fields.password.length >= 6) {
      setloading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          getadmin(user.uid);
          setadminloading(false);
          return user.uid;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return error;
        });
    } else {
      seterr(true);
    }
  };
  const handlesignin = (e) => {
    e.preventDefault();
    signinAdmin(fields.email, fields.password);
  };
  return (
    <motion.div
      initial={{ x: "50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=" z-20 flex flex-col items-center mt-32 bg-white h-max py-4  px-8"
    >
      <h1 className=" text-3xl w-max font-semibold text-slate-600 mb-8 ">
        Internal Login
      </h1>
      <form
        className=" flex flex-col items-center justify-center  "
        onSubmit={test}
        action=""
      >
        <div className=" flex flex-col">
          <p className=" text-xs font-medium text-slate-600 mt-2">Your email</p>
          <input
            onChange={handleChange}
            className="w-96 my-1 px-2 py-2 text-slate-900 outline-none rounded-md"
            id="email"
            type="text"
            placeholder="Email"
          />
          {err && fields.email.length === 0 && (
            <p className=" italic text-sm text-red-600">Email is required</p>
          )}
          <p className="text-xs font-medium text-slate-600 mt-2">
            Enter your password
          </p>
          <input
            onChange={handleChange}
            className="w-96 my-1 px-2 py-2 text-slate-900 outline-none rounded-md"
            required
            id="password"
            type="text"
            placeholder="Password"
          />
          {err && fields.password.length === 0 && (
            <p className=" italic text-sm text-red-600">Password is required</p>
          )}
        </div>

        <button
          onClick={handlesignin}
          className=" bg-blue-600 text-white px-6 py-2 text-normal rounded-full font-medium mt-4 "
          type="submit"
        >
          Login
        </button>
        {loading && (
          <div className=" aflex justify-center items-center">
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#1646f5", "#1646f5", "#1646f5", "#1646f5", "#1646f5"]}
            />
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default InternalLogin;
