const PostSchema = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find();
    res.status(200).json({
      getPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const createPosts = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await PostSchema.findById(id);
    res.status(200).json({
      detailPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostSchema.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.status(200).json({
      updatePost,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndDelete(req.body); //!Remove koyarsin
    res.status(201).json({
      message: "Silme islemi basarili...",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = search ? new RegExp(search, "i") : null;
    const tagArray = tag ? tag.split(",") : [];

    const query = {
      $or: [],
    };

    if (title) {
      query.$or.push({ title });
    }

    if (tagArray.length > 0) {
      query.$or.push({ tag: { $in: tagArray } });
    }

    if (query.$or.length === 0) {
      return res
        .status(400)
        .json({ message: "Search or tag must be provided" });
    }

    const posts = await PostSchema.find(query);
    res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPosts,
  getDetail,
  getPosts,
  getUpdate,
  deletePost,
  searchPost,
};
