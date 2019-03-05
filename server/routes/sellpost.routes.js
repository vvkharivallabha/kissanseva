import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import postCtrl from "../controllers/sellpost.controller";

const router = express.Router();

router
  .route("/api/sellposts/new/:userId")
  .post(authCtrl.requireSignin, postCtrl.create);

router.route('/api/sellposts/get/:userId')
  .get(authCtrl.requireSignin, postCtrl.sellPostByID)


router.param("userId", userCtrl.userByID);

export default router;
