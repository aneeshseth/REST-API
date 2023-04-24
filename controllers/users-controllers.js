const subscriber = require("../models/subscriber");

async function getSubscribers(req, res) {
  try {
    const subscribers = await subscriber.find();
    res.json({ subscribers });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function createSubscriber(req, res) {
  const subscriberz = new subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriberz.save();
    res.status(201).json({ newSubscriber });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getSubscriber(req, res) {
  let sub;
  try {
    sub = await subscriber.findById(req.params.id);
    if (sub == null) {
      return res.status(404).json({ message: "cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  res.sub = sub;
  res.json(res.sub);
}

async function deleteSubscriber(req, res) {
  let sub;
  try {
    sub = await subscriber.findById(req.params.id);
    if (sub == null) {
      return res.status(404).json({ message: "cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  res.sub = sub;
  try {
    await res.sub.deleteOne();
    res.json({
      message: "deleted sub",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function updateSubscriber(req, res) {
  let sub;
  try {
    sub = await subscriber.findById(req.params.id);
    if (sub == null) {
      return res.status(404).json({ message: "cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  res.sub = sub;
  if (req.body.name != null) {
    res.sub.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.sub.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSub = await res.sub.save();
    res.json(updatedSub);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

module.exports = {
  getSubscribers,
  createSubscriber,
  getSubscriber,
  deleteSubscriber,
  updateSubscriber,
};
