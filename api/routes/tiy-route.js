const express = require("express");
const router = express.Router();

const tiyCtrl = require("../controllers/tiy-controller");
const adminCtrl = require("../controllers/admin");
const offerCtrl = require("../controllers/offer-controller");
const operatorController = require("../controllers/operator");
const auth = require("./auth");
const checkValidation = require("./validation/checkValidation");
const tiyConfig = require("./validation/tiy-validation");
const offerConfig = require("./validation/offer-validation");
router.get("/", auth.optional, async (req, res) => {
  res.status(200).json({
    message: "tour-it-yourself's home page"
  });
});
router.get(
  "/browse",
  auth.require,
  operatorController.checkOperatorStatus,
  tiyCtrl.getNonAccepted
);
router.get(
  "/accepted",
  auth.require,
  adminCtrl.checkAdminStatus,
  tiyCtrl.getAccepted
);
router.get("/all", auth.require, adminCtrl.checkAdminStatus, tiyCtrl.getAll);
router.get(
  "/create",
  auth.require,
  operatorController.checkNonOperatorStatus,
  async (req, res) => {
    res.status(200).json({
      message: "add tiy page"
    });
  }
);
router.post(
  "/create",
  auth.require,
  operatorController.checkNonOperatorStatus,
  tiyConfig.tiy,
  checkValidation,
  tiyCtrl.addTiy
);
router.get(
  "/:tiyID",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  tiyCtrl.checkOwnTiyPlus,
  tiyCtrl.checkNonAccepted,
  tiyCtrl.getOneTiy
);
router.post(
  "/:tiyID",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  tiyCtrl.checkOwnTiy,
  tiyCtrl.cancelOffer
);
router.delete(
  "/:tiyID",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  tiyCtrl.checkOwnTiy,
  tiyCtrl.deleteTiy
);
router.get(
  "/:tiyID/edit",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  tiyCtrl.checkOwnTiy,
  tiyCtrl.getOneTiy
);
router.put(
  "/:tiyID/edit",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  tiyCtrl.checkOwnTiy,
  tiyConfig.tiy,
  checkValidation,
  tiyCtrl.editTiy
);

router.get(
  "/:tiyID/offers",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  tiyCtrl.checkOwnTiyPlus,
  offerCtrl.getByTiy
);
router.get(
  "/:tiyID/offers/create",
  auth.require,
  operatorController.checkOperatorStatus,
  tiyCtrl.checkNotNullTiy,
  async (req, res) => {
    res.status(200).json({
      message: "add offer page"
    });
  }
);
router.post(
  "/:tiyID/offers/create",
  auth.require,
  operatorController.checkOperatorStatus,
  tiyCtrl.checkNotNullTiy,
  offerConfig.add,
  checkValidation,
  offerCtrl.addOffer
);

router.get(
  "/:tiyID/offers/:offerID",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  offerCtrl.checkNotNullOffer,
  offerCtrl.checkOwnOfferPlus,
  offerCtrl.getOneOffer
);
//donesn't need body
router.post(
  "/:tiyID/offers/:offerID",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  offerCtrl.checkNotNullOffer,
  tiyCtrl.checkOwnTiy,
  tiyCtrl.acceptOffer
);
router.delete(
  "/:tiyID/offers/:offerID",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  offerCtrl.checkNotNullOffer,
  offerCtrl.checkOwnOffer,
  offerCtrl.deleteOffer
);

router.get(
  "/:tiyID/offers/:offerID/edit",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  offerCtrl.checkNotNullOffer,
  offerCtrl.checkOwnOffer,
  offerCtrl.getOneOffer
);
router.put(
  "/:tiyID/offers/:offerID/edit",
  auth.require,
  tiyCtrl.checkNotNullTiy,
  offerCtrl.checkNotNullOffer,
  offerCtrl.checkOwnOffer,
  offerConfig.add,
  checkValidation,
  offerCtrl.editOffer
);

module.exports = router;
