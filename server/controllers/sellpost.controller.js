import SellPost from "../models/sellpost.model";
import Item from "../models/item.model";
import _ from "lodash";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let post = new SellPost(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(result);
    });
  });
};

const sellPostByID = (req, res, next, id) => {
  SellPost.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post)
        return res.status("400").json({
          error: "Post not found"
        });
      req.post = post;
      next();
    });
};

const itemPostByID = (req, res, next, id) => {
  Item.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post)
        return res.status("400").json({
          error: "Post not found"
        });
      req.post = post;
      next();
    });
};

// const getItemQuantity = (req, res) => {
//   const itemid = req.params.itemId;
//   const userid = req.params.userId;
// };

const listSellFeed = (req, res) => {
  SellPost.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("-created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(posts);
    });
};

const listAllSellFeed = (req, res) => {
  SellPost.find((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(posts);
    });
};

const listItems = (req, res) => {
  Item.find((err, items) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(items);
  });
};

const remove = (req, res) => {
  let post = req.post;
  post.remove((err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(deletedPost);
  });
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

const isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status("403").json({
      error: "User is not authorized"
    });
  }
  next();
};
export default {
  create,
  sellPostByID,
  itemPostByID,
  listSellFeed,
  photo,
  remove,
  isPoster,
  listItems,
  listAllSellFeed
  //getItemQuantity
};
