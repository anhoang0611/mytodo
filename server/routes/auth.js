import express from "express";

const router = express.Router();

router.post("/login", (req, res, next) => {
  res.send("login route");
});

router.post("/register", (req, res, next) => {
  res.send("register route");
});

router.post("/logout", (req, res, next) => {
  res.send("logout route");
});

export default router;
