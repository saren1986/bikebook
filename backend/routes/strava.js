const router = require("express").Router();
const StravaController = require("../controllers/StravaController");

router.post("/sync", StravaController.sync);
router.post("/fetchBikes", StravaController.fetchBikes);
router.post("/devtest", StravaController.devtest);

module.exports = router;
