const express=require('express');
const router = express.Router();
const authController=require('../controllers/logout');
router.post('/',authController.handleLogout);

module.exports=router;