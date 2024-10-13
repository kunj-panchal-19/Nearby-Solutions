const express=require('express');
const router=express.Router();
const getfeedbackcontroller=require('../controllers/Getfeedbackcontroller');

router.get('/',getfeedbackcontroller.handlegetfeedback);
module.exports=router