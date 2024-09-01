const commentService = require("./comment.service");

const createComment = async (req, res, next) => {
  try {
    const result = await commentService.createComment(
      req.user,
      req.body.product_id,
      req.body.content
    );
    if (result.affectedRows !== null) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ message: "Comment fail" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCommentByProductId = async (req, res, next) => {
  try {
    const result = await commentService.getCommentByProductId(
      req.body.product_id
    );

    if (result !== null) {
      res.status(200).json(result);
    }

    res.json([]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createComment,
  getCommentByProductId,
};
