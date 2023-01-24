import React from "react";
import "../styles/background.css";

export default function Background() {
  // let link = "https://source.unsplash.com/random/?weather,pakistan";
  // let link = "https://cdn.wallpapersafari.com/75/72/9Xzk65.jpg";
  let link =
    "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  return (
    <>
      <div className="bgContainer">
        <img src={link} alt="" />
      </div>
    </>
  );
}
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
