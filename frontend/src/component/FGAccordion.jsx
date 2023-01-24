import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readDefaultData } from "../state/reducer/dataReducer";
//

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ControlledAccordions() {
  let [cityList, setcityList] = useState(null);
  //
  const dispatch = useDispatch();
  const val = useSelector((state) => state.citydata.dataDefaultArray);
  //
  useEffect(() => {
    console.log("default_val dataArray=>", val);
    setcityList(val);
    console.log("default=> cityList: ", cityList);
  });
  useEffect(() => {
    dispatch(readDefaultData());
  }, []);
  //
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {cityList === null
        ? "Loading..."
        : cityList.map((e, index) => (
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}bh-content`}
                id={`panel${index + 1}bh-header`}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingRight: "5%"
                  }}
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {e.name.toUpperCase()}, {e.sys.country.toUpperCase()}
                  </Typography>

                  <Typography sx={{ color: "text.secondary" }}>
                    {e.weather[0].description}
                  </Typography>
                  <Typography
                    sx={{ color: "text.secondary", marginLeft: "20px" }}
                  >
                    {e.main.temp}&deg;C
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p>
                    <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                      Feels Like
                    </span>
                    {e.main.feels_like}&deg;C
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                      min-max
                    </span>
                    {e.main.temp_min}&deg;C
                    {e.main.temp_max}&deg;C
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
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
    </div>
  );
}
