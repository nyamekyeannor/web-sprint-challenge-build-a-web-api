const express = require("express");
const Action = require("./actions-model");
const router = express.Router();

const {
  validateActionId,
  validateAction,
  errorHandling,
} = require("./actions-middlware");

router.get("/", (req, res) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateActionId, (req, res) => {
  Action.get(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((newAction) => {
      res.status(200).json(newAction);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  Action.remove(req.params.id)
    .then((deletedNumber) => {
      res.status(200).json(deletedNumber);
    })
    .catch((error) => {
      next(error);
    });
});

router.use(errorHandling);

module.exports = router;
