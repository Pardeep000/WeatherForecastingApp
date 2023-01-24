import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../state/reducer/dataReducer";
//
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//
import "../styles/card.css";
//

export default function BasicCard({ e, unit }) {
  //
  const dispatch = useDispatch();
  // const val = useSelector((state) => state.citydata.dataArray);
  //
  let handleDelete = (name) => {
    console.log("delete clicked...", name);
    let obj = {
      // name: name.toLowerCase()
      name: name
    };
    dispatch(deleteData(obj));
  };
  console.log("unit=>", unit);
  return (
    <div className="mainCardContainer">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Weather Details of the City
          </Typography>
          <div className="cardSection1">
            <div>
              <Typography
                sx={{ fontSize: 17, fontWeight: "bold" }}
                color="text.dark"
              >
                {e.name.toUpperCase()}, {e.sys.country.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: 15, mt: 0 }} color="text.secondary">
                {e.weather[0].description}
              </Typography>
            </div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
                style={{
                  width: "10vw",
                  height: "15vh",
                  position: "relative",
                  top: "-16%"
                }}
                alt=""
              />
            </div>
          </div>
          <div className="cardSection2">
            <div className="temp">
              <Typography
                sx={{ fontSize: 55, mt: 0, fontWeight: "bold" }}
                color="text.dark"
              >
                {e.main.temp}&deg;{unit === "metric" ? "C" : "F"}
              </Typography>
            </div>
            <div className="details">
              <p>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  Feels Like
                </span>
                {e.main.feels_like}&deg;{unit === "metric" ? "C" : "F"}
              </p>
              <p>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  min-max
                </span>
                {e.main.temp_min}&deg;{unit === "metric" ? "C" : "F"}/
                {e.main.temp_max}&deg;{unit === "metric" ? "C" : "F"}
              </p>
              <p>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  Wind-speed
                </span>
                {e.wind.speed}
              </p>
              <p>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  Humidity
                </span>
                {e.main.humidity}
              </p>
              <p>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  Pressure
                </span>
                {e.main.pressure} hpa
              </p>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <div className="buttonSection">
            <div className="buttons">
              {/* <Button className="b" size="small" sx={{ mx: 0 }}>
                <EditIcon />
              </Button> */}
            </div>
            <dib className="buttons2">
              <Button
                size="small"
                sx={{ mx: 0 }}
                onClick={() => handleDelete(e.name)}
              >
                <HighlightOffIcon />
              </Button>
            </dib>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
