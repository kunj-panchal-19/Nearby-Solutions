const express=require('express');
const router = express.Router();
const serviceController=require('../controllers/registerService');
router.post('/', serviceController.handleServiceRegister);

module.exports=router;