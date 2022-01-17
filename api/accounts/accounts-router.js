const router = require("express").Router();
const md = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json("get accounts");
  } catch (err) {
    next({ status: 422, message: "this is horrible" });
  }
});

router.get("/:id", md.checkAccountID, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json("get account by id");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    try {
      res.json("post account");
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  md.checkAccountID,
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    try {
      res.json("update account");
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", md.checkAccountID, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json("delete account");
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  });
  next();
  // DO YOUR MAGIC
});

module.exports = router;
