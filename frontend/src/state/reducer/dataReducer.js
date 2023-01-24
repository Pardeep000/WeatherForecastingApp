import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//
let apiUrl = "https://lblq5t.sse.codesandbox.io";
// First, create the thunk

export const deleteData = createAsyncThunk(
  "citydata/deleteData",
  async (userObj, thunkAPI) => {
    console.log("userObj from deleteData", userObj);
    //
    const obj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authtoken: localStorage.getItem("token")
      },
      body: JSON.stringify(userObj)
    };
    //
    let endpoint = "/deleteData";
    //
    let data = await fetch(apiUrl + endpoint, obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

export const addData = createAsyncThunk(
  "citydata/addData",
  async (userObj, thunkAPI) => {
    console.log("userObj from readData", userObj);
    //
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authtoken: localStorage.getItem("token")
      },
      body: JSON.stringify(userObj)
    };
    //
    let endpoint = "/addData";
    //
    let data = await fetch(apiUrl + endpoint, obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

export const readData = createAsyncThunk(
  "citydata/readData",
  async (userObj, thunkAPI) => {
    console.log("userObj from readData", userObj);
    //
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authtoken: localStorage.getItem("token")
      }
    };
    //
    let endpoint = "/readData";
    //
    let data = await fetch(apiUrl + endpoint, obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

export const readDefaultData = createAsyncThunk(
  "citydata/readDefaultData",
  async (userObj, thunkAPI) => {
    console.log("userObj from readData", userObj);
    //
    const obj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    };
    //
    let endpoint = "/readDefaultData";
    //
    let data = await fetch(apiUrl + endpoint, obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

const initialState = {
  //readUserdata
  dataArray: [],
  readmsg: "",
  readunit: "",
  readerror: null,
  //readDefaultdata
  dataDefaultArray: [],
  readDefaultmsg: "",
  readDefaulterror: null
  //
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearRmsg: (state) => {
      state.readmsg = "";
      console.log("Read_msg has been cleared");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(readData.fulfilled, (state, action) => {
      // state.dataArray = state.dataArray.concat(action.payload);
      state.dataArray = action.payload.result;

      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.readmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.readmsg = action.payload.msg;
        state.readunit = action.payload.unit;
        // console.log("state.readmsg:", state.readmsg);
        console.log("state.readunit:", state.readunit);
      }
      //end of builder
    });
    builder.addCase(readData.pending, (state, action) => {});
    builder.addCase(readData.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.readerror = action.payload;
    });
    //
    builder.addCase(readDefaultData.fulfilled, (state, action) => {
      // state.dataDefaultArray = state.dataDefaultArray.concat(action.payload);
      state.dataDefaultArray = action.payload.result;

      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.readDefaultmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.readDefaultmsg = action.payload.msg;
        console.log("state.readDefaultmsg:", state.readDefaultmsg);
        console.log("state.state.dataDefaultArray:", state.dataDefaultArray);
      }
      //end of builder
    });
    builder.addCase(readDefaultData.pending, (state, action) => {});
    builder.addCase(readDefaultData.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.readDefaulterror = action.payload;
    });
    //
    builder.addCase(addData.fulfilled, (state, action) => {
      // state.dataArray = action.payload.result;
      state.dataArray = action.payload.result;

      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.readmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        //
        state.readmsg = action.payload.msg;
        console.log("state.readDefaultmsg:", state.readmsg);
        console.log("state.dataArray:", state.dataArray);
      }
      //end of builder
    });
    builder.addCase(addData.pending, (state, action) => {});
    builder.addCase(addData.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.readerror = action.payload;
    });
    //

    builder.addCase(deleteData.fulfilled, (state, action) => {
      // state.dataArray = action.payload.result;

      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.readmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.dataArray = action.payload.result;
        state.readmsg = action.payload.msg;
        console.log("state.readDefaultmsg delete:", state.readmsg);
        console.log("state.dataArray delete:", state.dataArray);
      }
      //end of builder
    });
    builder.addCase(deleteData.pending, (state, action) => {});
    builder.addCase(deleteData.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.readerror = action.payload;
    });
    //
    //
  }
});

export const { clearRmsg } = usersSlice.actions;
export default usersSlice.reducer;
