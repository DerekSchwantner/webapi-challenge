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
        .status(404)
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
      res.status(404).json({
        message: "Unable to locate actions from a project with that id"
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get actions" });
  }
});

//Add a new project

router.post("/", async (req, res) => {
  const projInfo = req.body;
  try {
    const newProj = await projectDb.insert(projInfo);
    const projects = await projectDb.get();
    if (newProj) {
      res.status(201).json(projects);
    } else {
      res.status(400).json({
        message: "Check to see if both name and description are filled out"
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error occured trying to add a new project" });
  }
});

//Update a project

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedProjInfo = req.body;
  try {
    const updatedProj = await projectDb.update(id, updatedProjInfo);
    const project = await projectDb.get(id);
    if (updatedProj) {
      res.status(200).json({ project });
    } else {
      res
        .status(404)
        .json({ message: "Unable to locate project with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to update project" });
  }
});

//Delete a Project

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProject = await projectDb.remove(id);
    if (deleteProject > 0) {
      res.status(200).json({ message: "The project has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete the project with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to delete project" });
  }
});

module.exports = router;
