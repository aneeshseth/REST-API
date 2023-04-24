const express = require("express");
const router = express.Router();
const {
  getSubscribers,
  createSubscriber,
  getSubscriber,
  deleteSubscriber,
  updateSubscriber,
} = require("../controllers/users-controllers");

router.get("/", getSubscribers);
router.post("/", createSubscriber);
router.get("/:id", getSubscriber);
router.delete("/:id", deleteSubscriber);
router.patch("/:id", updateSubscriber);

module.exports = router;
