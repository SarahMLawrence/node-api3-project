const express = require("express");
const users = require("./userDb");
const router = express.Router();

router.post("/users", validateUserId, (req, res) => {
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

//NOT WORKING YET

// router.post("/users/:id/posts",validateUserId, validatePost, (req, res) => {
//   users
//     .insert(req.post)
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch((err) => {
//       console.log(err);
//       res
//         .status(500)
//         .json({ message: "Could not post a new comment for user" });
//     });
// });

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
router.put("/users/:id", validateUserId, validateUser, (req, res) => {
  users
    .update(req.user.id, req.body)
    .then((u) => {
      res.status(200).json(u);
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
  const id = req.params.id;

  users
    .getById(id)
    .then((u) => {
      if (u) {
        req.user = u;
        next();
      } else {
        res.status(400).json({
          message: "invalid user id",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "could not validate id",
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

//----------------------------------------------------------------------//
//  validatePost validates the body on a request to create a new post   //
//----------------------------------------------------------------------//
function validatePost(req, res, next) {
  // if (!req.body) {
  //   res.status(400).json({
  //     message: "missing post data",
  //   });
  // } else if (!req.body.name) {
  //   res.status(400).json({
  //     message: "missing required text field",
  //   });
  // }
  // next();
}

module.exports = router;
