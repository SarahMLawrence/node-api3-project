const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = router;
