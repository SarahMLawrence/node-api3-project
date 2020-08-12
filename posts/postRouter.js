const express = require("express");
const Posts = require("./postDb.js");
const router = express.Router();

// WORKING
router.get("/posts", (req, res) => {
  Posts.get().then((posts) => {
    res.status(200).json(posts);
  });
});

// WORKING
router.get("/posts/:id", validatePostId, (req, res) => {
  Posts.getById(req.post.id)
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      console.log(err);
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

router.put("/posts/:id", validatePostId, (req, res) => {
  Posts
  .update(req.params.id, req.body)
  .then((p) => {
    res.status(200).json(p);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: "User could not be updated",
  })
});

});

//-------------------------------------------CUSTOM MIDDLEWARE---------------------------------------------//


function validatePostId(req, res, next) {
  const id = req.params.id;

  Posts.getById(id)
    .then((p) => {
      if (p) {
        req.post = p;
        next();
      } else {
        res.status(400).json({
          message: "invalid post id",
        });
      }
    })
    next();
  }

module.exports = router;
