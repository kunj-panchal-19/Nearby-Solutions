//make a counter using react
// import React from 'react'
import React,{ useState, useEffect } from 'react'

 const Test = () => {
	 const [count, setCount] = useState(0);
	useEffect(()=>{
		fetch('https://jsonplaceholder.typicode.com/posts').then((res)=>{console.log(res.data); console.log("success");}).catch((err)=>{console.log(err);})
	},[])
	const func = (e) => {
		e.preventDefault();
		setCount(count + 1);
	}
	return (<>

		<button onClick={func} className="rounded bg-green-300 text-black px-4 py-2 m-4 border font-bold">Hello {count}</button>

	</>)
}
export default Test;


// //example of controlller finding by id

// import User from './model/user';


// const getUser = async(req,res)=>{
// 	try{

// 	const id=req.body.id;
// 	const response= await User.findById({id});

// }
// 	catch(err){
	
// }
// }


// //find all results
// import User from './model/users/'
// const allUsers=async (req,res) =>{
// 	try{
// 		const category= req.body.category;
// 		const response= await User.find({category: 
// 	}
// 	catch(err){}
// }



// //deleteMany having different criteria


// import User from './models/users'
// const deleteMany= async(req,res) =>{

// 	try{
// 		const city=req.body.city;
// 		const another=req.body.another
		
// 		const response = await deleteMany({"city":city, "another": another});
// 		if(!response){
// 			res.status(404).json({msg: "there was some error"});
// 		}
// 		else res.status(200).json({msg:"you got the msg"});
// }
// 	catch(e){
// 		console.log(e.message);
// 		res.status(404).json({msg: "there was some eror});
// }
// }

// module.exports= {deleteMany};
