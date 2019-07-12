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
      res.status(404).json({ message: "Unable to locate action with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get actions" });
  }
});

//Add an action

router.post("/", async (req, res) => {
  const actionInfo = req.body;
  const id = req.body.project_id;
  console.log(id);
  try {
    const newAction = await actionDb.insert(actionInfo);
    const projectActions = await projectDb.getProjectActions(id);
    if (newAction) {
      res.status(201).json(projectActions);
    } else {
      res.status(400).json({
        message:
          "Check to see if correct fields (project_id, description, notes ) are filled out"
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error occured trying to add a new action" });
  }
});

//Update an action

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedActionInfo = req.body;
  try {
    const updatedAction = await actionDb.update(id, updatedActionInfo);
    const action = await actionDb.get(id);
    if (updatedAction) {
      res.status(200).json({ action });
    } else {
      res.status(404).json({ message: "Unable to update action with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to update action" });
  }
});

//Delte an action

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteAction = await actionDb.remove(id);
    if (deleteAction > 0) {
      res.status(200).json({ message: "The action has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete the action with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to delete action" });
  }
});

module.exports = router;
