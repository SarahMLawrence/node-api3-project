const express = require("express");
const Posts = require("./postDb.js");
const router = express.Router();

// // CREATE A NEW POST
// router.post("/posts", (req, res) => {
//   Posts.insert(req.body)
//     .then((post) => {
//       if (!req.body.text) {
//         res.status(400).json({
//           error: "Please provide title and contents for the post",
//         });
//       } else {
//         res.status(201).json(post);
//       }
//     })
//     .catch((error) => {
//       // just log this error and send back a generic error response,
//       // since we're not exactly sure what went wrong
//       console.log(error);
//       res.status(500).json({
//         error: "There was an error while saving the post to the database",
//       });
//     });
// });


// WORKING
router.get("/posts", (req, res) => {
  Posts.get().then((posts) => {
    res.status(200).json(posts);
  });
});

//Working
router.get("/posts/:id", validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Could not retrieve posts for user" });
    });
});

// WORKING
router.delete("/posts/:id", validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then((id) => {
      res.status(200).json({ message: `successfully deleted post` });
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the post",
      });
    });
});

//Working
router.put("/posts/:id", validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "User could not be updated",
      });
    });
});

//-------------------------------------------CUSTOM MIDDLEWARE---------------------------------------------//

function validatePostId(req, res, next) {
  // const id = req.params.id;

  Posts.getById(req.params.id).then((post) => {
    if (!post) {
      res.status(400).json({
        message: "invalid post id",
      });
    } else {
      req.post = post;
      next();
    }
  });
}

module.exports = router;
