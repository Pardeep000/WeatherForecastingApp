// import React, { useEffect, useState } from "react";
// import "../styles/background.css";

// export default function Background() {
//   const [bgImg, setbgImg] = useState(null);
//   let link = "https://source.unsplash.com/random/?weather,pakistan";
//   useEffect(() => {
//     let url =
//       "https://api.unsplash.com/photos/random/?weather,pakistan&client_id=NGUM-Z6sxtKgzHaJjBX6hTWU3AklrYiLd-smtdQtFAI";
//     fetch(url)
//       .then((resp) => resp.json())
//       .then((data) => {
//         // console.log(data.urls.regular);
//         setbgImg(data.urls.regular);
//       });
//   });
//   return (
//     <>
//       <div className="bgContainer">
//         <img src={link} alt="" />
//       </div>
//     </>
//   );
// }
