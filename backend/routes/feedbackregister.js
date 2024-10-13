const express=require('express');
const router = express.Router();
const feedbackcontroller=require('../controllers/Feedbackcontroller');
router.post('/', feedbackcontroller.handleFeedbackRegister);

module.exports=router;