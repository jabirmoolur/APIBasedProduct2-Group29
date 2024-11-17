const express = require("express"),
  {
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
    couponValidate,
  } = require("../controllers/couponController"),
  router = express.Router();

router
  .route("/")
  .post(createCoupon)
  .get(getCoupon);

router
  .route("/:couponId")
  .patch(updateCoupon)
  .delete(deleteCoupon);

router.route("/validate").post(couponValidate);

module.exports = router;
