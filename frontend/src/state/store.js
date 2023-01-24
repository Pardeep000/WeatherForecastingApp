import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import dataReducer from "./reducer/dataReducer";

const store = configureStore({
  reducer: {
    userdata: userReducer,
    citydata: dataReducer
  }
});

export default store;
