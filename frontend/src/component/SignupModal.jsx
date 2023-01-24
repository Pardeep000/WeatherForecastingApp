import { useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
//
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../state/reducer/userReducer";
import { clearSmsg } from "../state/reducer/userReducer";
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
let SignupButton = {
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
export default function BasicModal() {
  //
  let userstatus = useSelector((e) => e.userdata);
  const dispatch = useDispatch();
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
    dispatch(registerUser(dataArray));
    // e.target.reset();
  };
  //
  useEffect(() => {
    //alert for signup messages
    if (userstatus.signupmsg !== "") alert(`${userstatus.signupmsg}`);
    if (userstatus.signupmsg === "User is created") {
      dispatch(clearSmsg());
    }
  });
  //
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={SignupButton}>
        SignUp
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form action="" onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="User Name"
                variant="standard"
                style={userInput}
                name="name"
              />
              <br />
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
              <br />
              <TextField
                id="standard-basic"
                label="Confirm Password"
                variant="standard"
                style={userInput}
                name="cpassword"
              />
              <br />
              <button type="submit">Register</button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
