import { useEffect, useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

//
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../state/reducer/dataReducer";
//

export default function ComboBox() {
  //
  const dispatch = useDispatch();
  const val = useSelector((state) => state.citydata.dataDefaultArray);
  //
  let [cityArray, setcityArray] = useState([]);
  useEffect(() => {
    fetch("https://lblq5t.sse.codesandbox.io/readCityNames")
      .then((a) => a.json())
      .then((resp) => setcityArray(resp))
      .catch((e) => console.log("error occurred..."));
  }, []);
  //
  useEffect(() => {
    // console.log("cityArray=>", cityArray);
  }, [cityArray]);
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
    dispatch(addData(dataArray));
    // e.target.reset();
  };
  //
  const PakistanCities = cityArray;
  return (
    <form action="" onSubmit={handleSubmit}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={PakistanCities}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField name="city" {...params} label="Cities" />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// const PakistanCities = [{ label: "The Godfather", year: 1972 }];
