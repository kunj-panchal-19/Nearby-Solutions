const express=require('express');
const router = express.Router();
const feedbackController=require(`../controllers/storeFeedback`);
router.post('/', feedbackController.storeFeedback);

module.exports=router;