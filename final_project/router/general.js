const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = require("./auth_users.js").isValid; // Import doesExist

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!doesExist(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
//public_users.get('/',function (req, res) {
  //res.send(JSON.stringify(books,null,4));
 //});

 // Async function to get the book list
 public_users.get('/', async function (req, res) {
    try {
      // Simulate an asynchronous operation (e.g., database query)
      const allBooks = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(books); // Resolve with the books data
        }, 500); // Simulate a 500ms delay
      });
  
      res.send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
      console.error("Error getting book list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    try {
        if (books[isbn]) {
            res.send(books[isbn]);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error getting book by ISBN:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  });

// Get books details on ISBN (Async)
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const book = books[isbn];

        if (book) {
            // Simulate an asynchronous operation (e.g., database query)
            const bookDetails = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(book); // Resolve with the book data
                }, 500); // Simulate a 500ms delay
            });

            res.send(JSON.stringify(bookDetails, null, 4));
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error getting book by ISBN:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const book = Object.values(books).find(book => book.author === author);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
  });

public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        const book = Object.values(books).find(book => book.author === author);

        if (book) {
            // Simulate an asynchronous operation (e.g., database query)
            const bookDetails = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(book); // Resolve with the book data
                }, 500); // Simulate a 500ms delay
            });

            res.send(JSON.stringify(bookDetails, null, 4));
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error getting book by author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const book = Object.values(books).find(book => book.title === title);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
  });

public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const book = Object.values(books).find(book => book.title === title);

        if (book) {
            // Simulate an asynchronous operation (e.g., database query)
            const bookDetails = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(book); // Resolve with the book data
                }, 500); // Simulate a 500ms delay
            });

            res.send(JSON.stringify(bookDetails, null, 4));
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error getting book by title:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
      if (book.reviews) {
          res.json(book.reviews);
      } else {
          res.status(404).json({ message: "No reviews found for this book" });
      }
  } else {
      res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
