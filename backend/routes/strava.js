const router = require("express").Router();
const StravaController = require("../controllers/StravaController");

router.get('/webhooks', StravaController.verifyWebhook);
router.post('/webhooks', StravaController.webhookReceiver);
router.post("/sync", StravaController.sync);
router.post("/sync-update", StravaController.syncUpdate);
router.post("/fetchBikes", StravaController.fetchBikes);
router.post("/devtest", StravaController.devtest); //TODO: DELETE

module.exports = router;
