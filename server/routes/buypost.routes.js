import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import buyPostCtrl from "../controllers/buypost.controller";

const router = express.Router();

router
  .route("/api/buyposts/new/:userId")
  .post(authCtrl.requireSignin, buyPostCtrl.create);

router.route("/api/buyposts/photo/:postId").get(buyPostCtrl.photo);

router
  .route("/api/buyposts/feed/:userId")
  .get(authCtrl.requireSignin, buyPostCtrl.listBuyFeed);

router
  .route("/api/buyposts/:postId")
  .delete(authCtrl.requireSignin, buyPostCtrl.isPoster, buyPostCtrl.remove);

router.param("userId", userCtrl.userByID);
router.param("postId", buyPostCtrl.buyPostByID);
export default router;
