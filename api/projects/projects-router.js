const express = require("express");

const Project = require("./projects-model");

//The middleware functions go here
const {
  validateId,
  validateProject,
  errorHandling,
} = require("./projects-middleware");
const router = express.Router();

//get an array of all projects
router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      next(error);
    });
});

//get project by id
router.get("/:id", validateId, (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//post project
router.post("/", validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch((error) => {
      next(error);
    });
});

//put project by id
router.put("/:id", validateProject, validateId, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch((error) => {
      next(error);
    });
});

//delete project by id
router.delete("/:id", validateId, (req, res) => {
  Project.remove(req.params.id)
    .then((deletedNumber) => {
      res.status(200).json(deletedNumber);
    })
    .catch((error) => {
      next(error);
    });
});

//get project actions
router.get("/:id/actions", validateId, (req, res) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.use(errorHandling);

module.exports = router;
