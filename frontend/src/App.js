import React, { useEffect } from "react";
import "./styles.css";
import Background from "./component/Background";
import Foreground from "./component/Foreground";
import Home from "./component/Home";
//
import { BrowserRouter, Routes, Route } from "react-router-dom";
//
import { useDispatch, useSelector } from "react-redux";
//
// import io from "socket.io-client";
// const serverUrl = "https://lblq5t.sse.codesandbox.io/";
// const socket = io.connect(serverUrl);
//

//
export default function App() {
  // const val = useSelector((state) => state.userdata.ownerInfo);
  // useEffect(() => {
  //   console.log("user logged in...", val);
  //   if (val !== "") {
  //     socket.emit("joinRoom", val.email);
  //   }
  //   // socket.on("msg", (payload) => {
  //   //   console.log("from server=>", payload);
  //   // });
  // });
  return (
    <>
      <BrowserRouter>
        <div className="mainContainer">
          <Background />
          <Routes>
            <Route path="/" element={<Foreground />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
