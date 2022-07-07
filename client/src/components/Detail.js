import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Detail = ({ addToCart }) => {
    const { id } = useParams("")
    console.log(id);
    const [getuserdata, setUserdata] = useState([])
    console.log(getuserdata);

    const getdata = async () => {


        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            }

        })
        const data = await res.json()
        console.log(data);

        if (res.status === 422 || !data) {

            console.log("error");
        } else {
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <div>
            <div className='container mt-3'>

                <Card>
                    <CardContent>
                        {/* <div className='add_btn'>
                        <NavLink to={`/edit/${getuserdata._id}`}> <button className='btn btn-primary mx-2'><BorderColorIcon /></button> </NavLink>
                        <button className='btn btn-danger' onClick={() => deleteuser(getuserdata._id)}><DeleteOutlineIcon /></button>
                    </div> */}
                        <div className='row'>
                            <div className='left_view col-lg-6 col-md-6 col-12'>
                                <img src={getuserdata.image} style={{ width: "300px", height: "300px" }} alt="profile" />


                            </div>
                            <div className='right_view col-lg-6 col-md-6 col-12'>
                                <p className='mt-3'>Title: <span>{getuserdata.title}</span></p>
                                <p className='mt-3'>Category: <span>{getuserdata.category}</span></p>
                                <p className='mt-3'>Price:<span>{getuserdata.price}</span></p>
                                <p className='mt-3'>Description:<span>{getuserdata.description} </span></p>
                                {localStorage.getItem("user") && (
                                    <button type="submit" className='btn btn-danger ' onClick={() => addToCart(getuserdata._id)}>
                                        ADD TO CART
                                    </button>
                                )}
                                <NavLink to='/'> <button className='btn btn-success mx-5'>Back</button></NavLink>
                            </div>
                        </div>


                    </CardContent>
                </Card>
            </div></div>
    )
}

export default Detail