// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import Cart from "./Cart";
// import axios from "axios";
// import home from "../assets/lotsOfBooks.jpg";

// const Home = ({ data, addToCart }) => {
//   return (
//     <>
//       <img src={home} className="homeImage" />
//       <hr />
//       <h2 style={{ textAlign: "center",color:"red" }}> Available Books</h2>
//       <div className="home_all">
//       <div className="main-container">
//         {data.map((item) => {
//           return (
//             <div className="container" key={item._id}>
//               <div className="header">
//                 <img src={item.image} alt="default img" />
//               </div>
//               <div className="content">
//                 <h4 style={{ fontWeight: "bold" }}>{item.title}</h4>
//                 <h6 style={{ fontWeight: "bold" }}>{item.category}</h6>
//                 <div className="des">
//                 <p>{item.description}</p></div>
//                 <h6 style={{ color: "green" }}>20% OFF</h6>
//                 <h5 style={{ fontWeight: "bold" }}>{item.price} Rs.</h5>
//                 {localStorage.getItem("user") && (
//                   <button type="submit" onClick={() => addToCart(item._id)}>
//                     ADD TO CART
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       </div>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import axios from "axios";
import home from "../assets/lotsOfBooks.jpg";

const Home = ({ data, addToCart }) => {
  return (
    <>
      <img src={home} className="homeImage" />
      <hr />
      <h2 style={{ textAlign: "center" }}> Available Books</h2>
    <span className=" d-flex  justify-content-end" ><Link  className="btn btn-light" to="/createbook">Add Book</Link> </span>
      <div className="main-container">
        {data.map((item) => {
          return (
            <div className="container" key={item._id}>
              <div className="header">
              <Link to={`view/${item._id}`}><img src={item.image} alt="default img" /></Link> 
              </div>
              <div className="content">
                <h4 style={{ fontWeight: "bold" }}>{item.title}</h4>
                <h6 style={{ fontWeight: "bold" }}>{item.category}</h6>
                <span className="des">{item.description}</span>
                
                <h6 style={{ color: "green" , paddingTop:"10px"}}>20% OFF</h6>
                <h5 style={{ fontWeight: "bold" }}>{item.price} Rs.</h5>
                <span className="align-bottom">
                {localStorage.getItem("user") && (
                  <button type="submit" className="align-bottom" onClick={() => addToCart(item._id)}>
                    ADD TO CART
                  </button>
                )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
