const express = require("express"),
  router = express.Router(),
  authorizationRoutes = require("./auth"),
  appointmentsRoutes = require("./appointments");

router.use("/auth", authorizationRoutes);
router.use("/", appointmentsRoutes);

module.exports = router;
