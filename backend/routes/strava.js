const router = require("express").Router();
const StravaController = require("../controllers/StravaController");

router.post("/sync", StravaController.sync);
router.post("/fetchBikes", StravaController.fetchBikes);

module.exports = router;
