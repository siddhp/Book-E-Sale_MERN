import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Addbook = () => {
    // const navigate = useNavigate("");
    const [inpval,setInp] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        count: "",
        image: ""

    })

    const setdata = (e) => {
        const { name, value } = e.target
        setInp((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addinpdata = async(e) => {
        e.preventDefault()

        const { title,category,description,price,count,image } = inpval

        const res = await fetch('/createbook', {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body:JSON.stringify({
                title,category,description,price,count,image 
            })
        })
        const data = await res.json()
        console.log(data);

        if (res.status === 422 || !data) {
            alert("error")
            console.log("error");
        } else {
            // setUdata(data)
            // navigate('/');
            toast.success("Book added successfully")
            console.log("data added");
        }
    }


    return (
        <div className='container' style={{backgroundColor:"#f5fcfc"}}>
            <NavLink className='btn btn-light p-2' to="/">Back</NavLink>
            <form className='mt-5'>
                <div className='row'>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="title" className="form-label lab">Title</label>
                        <input type="text" name='title' onChange={setdata} value={inpval.title} className="form-control" id="title" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="category" className="form-label lab">category</label>
                        <input type="text" name='category' onChange={setdata} value={inpval.category} className="form-control" id="category" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="price" className="form-label lab">price</label>
                        <input type="number" name='price' onChange={setdata} value={inpval.price} className="form-control" id="price" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="count" className="form-label lab">count</label>
                        <input type="number" name='count' onChange={setdata} value={inpval.count} className="form-control" id="count" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="image" className="form-label lab">image</label>
                        <input type="text" name='image' onChange={setdata} value={inpval.image} className="form-control" id="image" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="description" className="form-label lab">Description</label>
                        <textarea name='description' value={inpval.description} onChange={setdata} className='form-control' id='description' cols="30" rows='5'></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                    <ToastContainer/>
                </div>
            </form>
        </div>
    )
}

export default Addbook