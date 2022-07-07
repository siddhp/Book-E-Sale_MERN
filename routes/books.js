const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Book = require("../models/Book");

router.get("/allbooks", (req, res) => {
  Book.find()
    .then((books) => {
      res.json({ books });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.post('/createbook', async(req, res) => {
  const { title,category,description,price,count,image } = req.body

  try {

          const adduser = new Book({
            title,category,description,price,count,image
          })

          await adduser.save()
          res.status(201).json(adduser)
          console.log(adduser);
  

  } catch (e) {
      res.status(422).json(e)
  }
})

//get book detail

router.get("/getuser/:id", async (req, res) => {
  try {
      console.log(req.params);
      const { id } = req.params

      const userindividual = await Book.findById({ _id: id })

      console.log(userindividual);
      res.status(201).json(userindividual)
  } catch (e) {
      res.status(422).json(e)

  }
})
// router.post("/createbook", (req, res) => {
//   const { image, title, category, description, price, count } = req.body;
//   if (!image || !title || !category || !description || !price || !count) {
//     return res.status(422).json({ error: "Plase add all the fields" });
//   }
//   const book = new Book({
//     image,
//     title,
//     category,
//     description,
//     price,
//     count,
//   });
//   book
//     .save()
//     .then((result) => {
//       res.json({ book: result });
//     })
//     .catch((err) => {
//       // console.log(err);
//     });
// });

router.post("/search-books", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  Book.find({ title: { $regex: userPattern } })
    .select("_id title")
    .then((book) => {
      res.json({ book });
    })
    .catch((err) => {
      // console.log(err);
    });
});

module.exports = router;
