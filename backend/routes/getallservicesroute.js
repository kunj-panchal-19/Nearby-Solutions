const express=require('express');
const router=express.Router();
const getallservicescontroller=require('../controllers/Getallservicescontroller');

router.get('/',getallservicescontroller.handlegetallservices);
module.exports=router