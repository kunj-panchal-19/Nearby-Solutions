const  User  = require("../models/userSchema");
const Community =require("../models/community.model");
const ErrorHandler =require("../middlewares/error");

const addQuestion = async (req, res, next) => {
  try {
    const { id , question, tags } = req.body;
    const result1 = await User.findById(id);
    if (!result1) return next(new ErrorHandler("User Not found", 404));
    console.log(result1);
    const user = result1._id;
    console.log("add question");
    const post = new Community({
      user,
      question,
      tags,
    });
    await post.save();
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
};

const addAnswer = async (req, res, next) => {
  try {
    const { user_id, question_id, answer } = req.body;

    // Check if the question exists
    const questionExists = await Community.findOne({ _id: question_id });
    if (!questionExists) {
      return next(new ErrorHandler("Question not found", 404));
    }

    // Update the Community document to add the answer
    const result = await Community.updateOne(
      { _id: question_id },
      { $push: { answers: { user: user_id, answer: answer } } }
    );

    res
      .status(200)
      .json({ message: "Answer added successfully", result: result });
  } catch (err) {
    console.error(err);
    return next(new ErrorHandler("Internal server error", 500));
  }
};

const getAllPost = async (req, res, next) => {
  try {
    console.log("getall ans");
    const result = await Community.find().sort({timestapms: - 1})
      .populate('user') // Populate the user field in the main object
      .populate('answers.user'); // Populate the user field within the answers array
    if (!result || result.length === 0) {
      console.log("No data");
      return next(new ErrorHandler("No data found", 404));
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Internal server error", 500));
  }
};

module.exports={getAllPost,addQuestion, addAnswer}