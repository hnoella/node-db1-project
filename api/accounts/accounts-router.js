const router = require("express").Router();
const md = require("./accounts-middleware");

const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
    res.json("get accounts");
  } catch (err) {
    next({ status: 422, message: "this is horrible" });
  }
});

router.get("/:id", md.checkAccountID, async (req, res, next) => {
  res.json(req.account);
  next();
});

router.post(
  "/",
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Account.create(req.body);
      res.status(201).json(newAccount);
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
  async (req, res, next) => {
    const updated = await Account.updateById(req.params.id, req.body);
    res.json(updated);
    try {
      res.json("update account");
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", md.checkAccountID, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
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
