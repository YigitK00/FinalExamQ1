const router = require("express").Router();
let BookList = require("../models/book.model");

router.route("/").get((req, res) => {
  BookList.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;

  const newBook = new BookList({
    title,
    author,
    description,
  });

  newBook
    .save()
    .then(() => res.json("Book added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  BookList.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  BookList.findByIdAndDelete(req.params.id)
    .then(() => res.json("Book deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  BookList.findById(req.params.id)
    .then((book) => {
      book.title = req.body.title;
      book.author = req.body.author;
      book.description = req.body.description;

      book
        .save()
        .then(() => res.json("Book updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
