const Project = require("./projects-model");

async function validateId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ status: 404, message: "Project not found" });
    }
  } catch (error) {
    next(error);
  }
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    next({ status: 400, message: "missing required fields" });
  } else {
    next();
  }
}
function validateProjectStrict(req, res, next) {
  if (!req.body.name || !req.body.description || !req.body.completed) {
    next({ status: 400, message: "missing required fields" });
  } else {
    next();
  }
}

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: `${err.message}`,
  });
}

module.exports = {
  validateId,
  validateProject,
  errorHandling,
};
