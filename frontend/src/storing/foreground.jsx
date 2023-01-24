import React, { useState, useEffect } from "react";
export default function Foreground() {
  let [citydata, setCitydata] = useState(null);
  let [cityname, setCityname] = useState("type city name");
  // let api ="https://api.openweathermap.org/data/2.5/weather?q=karachi&units=metric&appid=7c2fa704dc2fc95b39e45e4dc81acbd5";
  // //
  let handleSearch = () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=7c2fa704dc2fc95b39e45e4dc81acbd5`;
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data=>", data);
        setCitydata(data);
      });
  };
  return (
    <>
      <input
        type="text"
        value={cityname}
        onChange={(e) => setCityname(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>
      {citydata === null ? (
        "nothing"
      ) : (
        <div>
          <p>{citydata.name}</p>
          <p>{citydata.main.temp}</p>
          <p>{citydata.weather[0].main}&deg;C</p>
          <p>{citydata.weather[0].description}</p>
          <div style={{ width: "5%", height: "5%" }}>
            <img
              src={`http://openweathermap.org/img/wn/${citydata.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </div>
      )}
      {/* <p>{citydata.weather[0].main}</p> */}
      {/* <p>{citydata.weather[0].description}</p> */}
    </>
  );
}
