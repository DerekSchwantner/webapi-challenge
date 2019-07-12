const express = require("express");
const projectDb = require("../helpers/projectModel");
const router = express.Router();

//Get projects list and project by ID and actions of a project by its ID

router.get("/", async (req, res) => {
  try {
    const projects = await projectDb.get();
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(400).json({ message: "Unable to locate projects" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get projects" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await projectDb.get(id);
    console.log("the project is:", project);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(400)
        .json({ message: "Unable to locate project with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get project" });
  }
});

router.get("/:id/actions", async (req, res) => {
  const id = req.params.id;

  try {
    const findProj = await projectDb.get(id);
    console.log("is the project found:", findProj);
    const projectActions = await projectDb.getProjectActions(id);
    if (findProj) {
      res.status(200).json(projectActions);
    } else {
      res.status(400).json({
        message: "Unable to locate actions from a project with that id"
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get actions" });
  }
});

module.exports = router;
