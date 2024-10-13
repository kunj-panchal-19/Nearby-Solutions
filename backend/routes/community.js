const express =require("express") ;
const { getAllPost, addAnswer,addQuestion} =require("../controllers/community.controller");

const route = express.Router();

route.post("/addQuestion",addQuestion);
route.post("/addAnswer",addAnswer);
route.get("/getAllCommunity",getAllPost)

module.exports=route;