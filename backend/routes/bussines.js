const express=require('express');
const router = express.Router();
const bussinesController=require('../controllers/registerBussines');
router.post('/', bussinesController.handleBussinesRegister);

module.exports=router;