const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
const e = require("express");
const router = express.Router();

router.post("/users", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Could not add new user" });
    });
});

router.post("/users/:id/posts", validatePost, validateUserId, (req, res) => {
  let id = req.params.id;
  let post = {
    text: req.body.text,
    user_id: id,
  };
  posts
    .insert(post)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

//WORKING - GET USER
router.get("/users", (req, res) => {
  users
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve USERS" });
    });
});

//WORKING
router.get("/users/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

//working
router.get("/users/:id/posts", validateUserId, (req, res) => {
  users
    .getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve posts for user" });
    });
});

// working
router.delete("/users/:id", validateUserId, (req, res) => {
  users
    .remove(req.user.id)
    .then((id) => {
      res.status(200).json({ message: `successfully deleted ${id} user` });
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

// WORKING
router.put("/users/:id", validateUser, validateUserId, (req, res) => {
  users
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "User could not be updated",
      });
    });
});

//-------------------------------------------CUSTOM MIDDLEWARE---------------------------------------------//

//----------------------------------------------------------------------//
//  validateUserId validates the user id on every request that expects  //
//  a user id parameter                                                 //
//----------------------------------------------------------------------//
function validateUserId(req, res, next) {
  users
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        // attach the user data to the request
        // so we can access it later
        req.user = user;
        next();
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user",
      });
    });
}

//----------------------------------------------------------------------//
//  validateUser validates the body on a request to create a new user   //
//----------------------------------------------------------------------//
function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing user data",
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field",
    });
  }
  next();
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" }).end();
  } else {
    next();
  }
}

module.exports = router;
