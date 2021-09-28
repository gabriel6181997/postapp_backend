const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    res.json({ error: "User Doesn't exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong Username and Password Combination" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json(accessToken);
  });
});

module.exports = router;
