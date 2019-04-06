import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import sellPostCtrl from "../controllers/sellpost.controller";

const router = express.Router();

router
  .route("/api/sellposts/new/:userId")
  .post(authCtrl.requireSignin, sellPostCtrl.create)

  router.route('/api/sellposts/photo/:postId')
  .get(sellPostCtrl.photo)

  router.route('/api/sellposts/feed/:userId')
  .get(authCtrl.requireSignin, sellPostCtrl.listSellFeed)
  router.route('/api/items')
  .get(sellPostCtrl.listItems)
  // router.route('/api/items/:itemId&:userId')
  // .get(sellPostCtrl.getItemQuantity)
  router.route('/api/sellposts/:postId')
  .delete(authCtrl.requireSignin, sellPostCtrl.isPoster, sellPostCtrl.remove)


router.param("userId", userCtrl.userByID)
router.param('postId', sellPostCtrl.sellPostByID)
router.param('itemId', sellPostCtrl.itemPostByID)
export default router;
