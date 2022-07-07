import React from "react";
import { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ data, addToCart, user, setUser }) => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [bookDetails, setBookDetails] = useState([]);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (user) {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black", cursor: "pointer" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link exact to="/cart">
            <i className="material-icons" style={{marginLeft:"5px"}}>shopping_cart</i>
          </Link>
        </li>,
        <li key="5">
          <button
            className="btn #c62828  darken-3"
            style={{backgroundColor:"#fa706b",color:"white", marginLeft:"5px"}}
            onClick={() => {
              localStorage.removeItem("jwt");
              localStorage.removeItem("user");
              history.push("/");
              setUser("");
               // M.toast({
               //   html: "You are Logged Out",
               //   classes: "#c62828 red darken-3",
              
              // });
              toast.success("You are Logged Out")
            }}
          >
            Logout
            <ToastContainer/>
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="small material-icons modal-trigger"
            style={{ color: "black" }}
          >
            search
          </i>
        </li>,
        <li key="6">
          <Link to="/signin">Signin</Link>
        </li>,
        <li key="7">
          <Link to="/signup">SignUp</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-books", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setBookDetails(results.book);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          <img className="logo" src={Logo} alt="E-Book-Sale" />
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {bookDetails.map((item) => {
              return (
                <div
                  // to={"/book/" + item._id}
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <div className="collection-item">
                  {/* <img style={{ width: "200px", height: "200px" }} src={item.image} alt="default img" /> */}
                  {/* <Link to={`view/${item._id}`}></Link> */}
                    <p>{item.title}</p>
                    {localStorage.getItem("user") && (
                      <button className="btn btn-danger" onClick={() => addToCart(item._id)}>
                        ADD TO CART
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="position-absolute top-0 end-0">
          <button
            className="modal-close btn-primary sticky-top btn"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
