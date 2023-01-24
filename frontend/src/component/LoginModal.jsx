import { useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//
import TextField from "@mui/material/TextField";
//
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../state/reducer/userReducer";
import { clearLmsg } from "../state/reducer/userReducer";
//
import { useNavigate } from "react-router-dom";
//

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
let loginButton = {
  fontWeight: "bold",
  fontSize: "25px",
  width: "12vw",
  height: "5vh",
  margin: "0px 15px",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  color: "white",
  backgroundColor: "rgba(59, 165, 255, 0.5)"
};
let userInput = {
  marginBottom: "15px",
  width: "100%"
};
//
export default function BasicModal() {
  const navigate = useNavigate();
  //
  let userstatus = useSelector((e) => e.userdata);
  const dispatch = useDispatch();
  //

  //
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked sign up...");
    let dataArray = {};
    let formdata = new FormData(e.target);
    for (let [key, value] of formdata) {
      dataArray[key] = value;
    }
    console.log("dataArray=>", dataArray);
    dispatch(loginUser(dataArray));
    // e.target.reset();
  };
  //
  useEffect(() => {
    console.log("userstatus.LOGINmsg from useEffect", userstatus.loginmsg);
    console.log("userstatus.SIGNUPmsg from useEffect", userstatus.signupmsg);
    console.log(
      "localStorageToken from useEffect",
      localStorage.getItem("token")
    );
    //alert for login messages
    if (
      userstatus.loginmsg !== "" &&
      userstatus.loginmsg !== "password matched"
    )
      alert(`${userstatus.loginmsg}`);
    //
    if (userstatus.loginmsg === "password matched") {
      dispatch(clearLmsg());
      //
      navigate("/home");
      //
    }
  });
  //
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={loginButton}>
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form action="" onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="Email Address"
                variant="standard"
                style={userInput}
                name="email"
              />
              <br />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                style={userInput}
                name="password"
              />
              <button type="submit">Login</button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
