import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//
let apiUrl = "https://lblq5t.sse.codesandbox.io";
// First, create the thunk
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userObj, thunkAPI) => {
    console.log("userObj from registerUser", userObj);
    //
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(userObj)
    };
    //
    let endpoint = "/newuser";
    //
    let data = await fetch(apiUrl + endpoint, obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userObj, thunkAPI) => {
    console.log("userObj from loginUser", userObj);
    //
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(userObj)
    };
    //
    let endpoint = "/loginuser";
    //
    let data = await fetch(apiUrl + endpoint, obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

const initialState = {
  //signupUser
  dataArray: [],
  signupmsg: "",
  signuperror: null,
  //loginUser
  loginArray: [],
  loginmsg: "",
  ownerInfo: "",
  loginerror: null
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSmsg: (state) => {
      state.signupmsg = "";
      console.log("Signup_msg has been cleared");
    },
    clearLmsg: (state) => {
      state.loginmsg = "";
      console.log("Login_msg has been cleared");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.dataArray = state.dataArray.concat(action.payload);

      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.signupmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.signupmsg = action.payload.msg;
      }
      //end of builder
    });
    builder.addCase(registerUser.pending, (state, action) => {});
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.signuperror = action.payload;
    });
    //
    builder.addCase(loginUser.fulfilled, (state, action) => {
      //
      state.loginArray = state.loginArray.concat(action.payload);
      console.log("userReducer fulfilled action.payload = ", action.payload);
      //
      //saving messages to state.msg so that it can be used on the front-side
      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.loginmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.loginmsg = action.payload.msg;
        //
        if (action.payload.msg === "password matched") {
          state.loginmsg = action.payload.msg;
          state.ownerInfo = action.payload.ownerObj;
          localStorage.setItem("token", action.payload.token);
        }
      }
      //end of builder
    });
    builder.addCase(loginUser.pending, (state, action) => {
      console.log("userReducer pending action.payload = ", action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.loginerror = action.payload;
    });
  }
});

export const { clearSmsg, clearLmsg } = usersSlice.actions;
export default usersSlice.reducer;
