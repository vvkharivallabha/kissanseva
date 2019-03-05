import SellPost from "../models/sellpost.model";
import _ from "lodash";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";

const create = (req, res, next) => {
  let post = new SellPost(req.body);
  //post.postedBy = req.profile;
  // if (files.photo) {
  //   post.photo.data = fs.readFileSync(files.photo.path);
  //   post.photo.contentType = files.photo.type;
  // }
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(result);
  });
};

const sellPostByID = (req, res, id) => {
  SellPost.find({ postedBy: req.profile._id }, function(err, sellposts) {
    res.json(sellposts);
  });
};

export default {
  create,
  sellPostByID
};
