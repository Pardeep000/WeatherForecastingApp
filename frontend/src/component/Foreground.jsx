import React from "react";
import Accord from "./FGAccordion";
import "../styles/foreground.css";
//
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
//
export default function Foreground() {
  //
  return (
    <>
      <div className="mainFore">
        <div className="leftSection">
          <Accord />
        </div>
        <div className="rightSection">
          <LoginModal />
          <SignupModal />
        </div>
      </div>
    </>
  );
}
