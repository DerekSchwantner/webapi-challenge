const express = require("express");
const actionDb = require("../helpers/actionModel");
const projectDb = require("../helpers/projectModel");
const router = express.Router();

//Get request for actions with a specific ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const actions = await actionDb.get(id);
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(400).json({ message: "Unable to locate actions" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get actions" });
  }
});

module.exports = router;
