import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import Signup1 from "../../components/SignUpParts/Signup1";
import Signup2 from "../../components/SignUpParts/Signup2";
import { registerUser } from "../../../Firebase/ClientFbSignup";
import { ColorRing } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setuser, setadmin } from "../../../redux/AuthSlice";
import "./signup.css";
const FormFields = {
  displayName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
const color = ["#454145", "#454145", "#fc0349"];
const SignUp = () => {
  const navigate = useNavigate();
  const [part, setpart] = useState(1);
  const [loading, setloading] = useState(false);
  const [errFirst, seterrFirst] = useState(false);
  const [errSecond, seterrSecond] = useState(false);
  const [fields, setfields] = useState(FormFields);
  const { displayName, email, password, phone } = fields;
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user);
  }, []);

  const handleChange = (e) => {
    setfields((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const addphone = async (id) => {
    await setDoc(doc(db, "ClientPhone", id), {
      phone: phone,
    });
  };
  const createrole = async (id) => {
    await setDoc(doc(db, "Roles", id), {
      isAdmin: false,
    });
  };
  const handleincrease = async () => {
    switch (part) {
      case 1:
        if (
          displayName.length !== 0 &&
          email.length !== 0 &&
          phone.length !== 0
        ) {
          setpart((prev) => prev + 1);
        } else {
          seterrFirst(true);
        }
        break;
      case 2:
        if (password.length >= 6) {
          setloading(true);
          registerUser(displayName, email, password, phone).then((c) => {
            addphone(c.user.uid);
            createrole(c.user.uid);
            setloading(false);
            dispatch(setuser({ uid: c.user.uid, name: displayName }));
            navigate("/details");
          });
        } else {
          seterrSecond(true);
        }
        break;

      default:
        break;
    }
  };
  const handledecrease = () => {};
  return (
    <div className=" bg-signup_bg w-screen h-screen flex justify-center items-center">
      <div className=" bg-signup_2bg flex justify-center items-center w-4/5 h-4/5 relative">
        <div className=" bg-white w-4/5 h-4/5 flex md:justify-center ">
          <div className="signupcont  w-1/2 h-full flex flex-col items-center justify-center relative">
            <div className=" w-80 h-max ">
              {part === 1 && (
                <Signup1
                  handlechange={handleChange}
                  err={errFirst}
                  fields={fields}
                />
              )}
              {part === 2 && (
                <Signup2
                  handlechange={handleChange}
                  fields={fields}
                  err={errSecond}
                />
              )}
              <div className=" w-full flex justify-center items-center flex-col ">
                <button
                  onClick={handleincrease}
                  className=" bg-singup_btn w-12 h-12 rounded-full text-white "
                >
                  <EastIcon color="white" />
                </button>
              </div>
            </div>
            <div className="signupStep flex w-12 absolute  justify-between items-center bottom-0 right-0">
              <div
                className={` w-3 h-3 rounded-full border border-singup_btn ${
                  part === 1 && " bg-singup_btn"
                }`}
              ></div>
              <div
                className={` w-3 h-3 rounded-full border border-singup_btn ${
                  part === 2 && " bg-singup_btn"
                }`}
              ></div>
            </div>
          </div>

          <div className=" w-1/2 md:flex justify-center items-center hidden ">
            <img src="/Mobile-login.jpg" alt="" />
          </div>
        </div>
        {loading && (
          <div className=" absolute bottom-0 left-0 right-0 flex justify-center items-center">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#ff0059", "#ff0059", "#ff0059", "#ff0059"]}
            />
          </div>
        )}
      </div>
      <button
        className=" bg-black text-white"
        onClick={() => console.log(user)}
      >
        test
      </button>
    </div>
  );
};

export default SignUp;
