import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./home.css";
import { useSelector } from "react-redux";
import Navbar from "../Client_panel/components/Navbar/Navbar";
import ClientLogin from "../Client_panel/components/ClientLogin/ClientLogin";
import Footer from "../Client_panel/components/Footer/Footer";
const Home = () => {
  const [progress, setProgress] = React.useState(10);
  const [data, setdata] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, isAdmin, name } = useSelector((state) => state.Auth);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 80 ? 80 : prevProgress + Math.floor(Math.random() * 10)
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const text =
    '"\n" + "Project Name: App Development\n" + "\n" + "Client Details:\n"';
  const value = text.split("+");
  const result = value.map((c) => c.replace(/"/g, ""));
  const percentage = 66;
  const sendrequest = async () => {
    const result = await axios.post("http://localhost:4000/api/gpt/send", {
      name: "abhishek",
    });
    const filtered = result.data.replace(/\/n/g, "<br/>");
    setdata(filtered);
    console.log(result.data);
  };
  if (user && isAdmin) {
    console.log(isAdmin);
    return <Navigate to={"/admin"} />;
  }
  if (user && !isAdmin) {
    return <Navigate to={"/projects"} />;
  }
  return (
    <div className="landing-page flex flex-col justify-between items-center">
      <Navbar />
      <section className=" w-screen h-screen">
        <div className=" mainCont11 flex justify-between h-full">
          <div className=" titleMain w-1/2 h-full flex justify-center items-center flex-col">
            <h1 className="title1 text-4xl text-slate-800 font-extrabold w-4/5 ">
              Your Vision, Our Expertise: Bring Your Ideas to Life!
            </h1>
            <p className="title2 text-sm text-slate-400 font-semibold w-4/5 mt-4 ">
              Welcome to XYZ, where innovation meets expertise! We're here to
              turn your ideas into reality. Whether you have an app concept, a
              software project, or a business solution in mind, we've got you
              covered.
            </p>
          </div>
          <div className=" imgMain w-1/2 h-full flex justify-center items-center">
            <img
              className="imageLandPage w-full "
              src="./landPage.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className=" relative sec2 w-screen h-screen flex flex-col justify-center items-center bg-opacity-10 bg-contain">
        <ClientLogin />
      </section>
      <section className=" w-screen h-max">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
{
  /* <div className=""></div>
<div className=" flex justify-center items-center">
  <div className="">
    {" "}
    <a className=" bg-teal-200 w-max px-4 py-2" href="/signup">
      SignUp
    </a>
  </div>
  <div className="">
    <a className=" bg-teal-500 w-max px-4 py-2" href="">
      Admin login
    </a>
  </div>
  <div className="">
    {result.map((c) => (
      <p> {c} </p>
    ))}
  </div>
  <div className=" w-10 h-10">
    <CircularProgressbar
      maxValue={100}
      value={progress}
      text={`${progress}%`}
    />
  </div>
  ;
</div>
<div className=""></div>
<button onClick={sendrequest}>get gpt msg</button>
<button onClick={handleOpen}>OPEN</button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}></Box>
</Modal> */
}
