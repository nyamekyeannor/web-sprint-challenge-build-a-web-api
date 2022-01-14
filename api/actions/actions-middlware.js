const Action = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ status: 404, message: "Action not found" });
    }
  } catch (error) {
    next(error);
  }
}

function validateAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    next({ status: 400, message: "Missing required fields" });
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
  validateActionId,
  validateAction,
  errorHandling,
};
