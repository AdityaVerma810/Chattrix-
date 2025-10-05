

//Get all user except the Logged in user

import Message from "../models/Message.js";
import User from "../models/User.js";

export const getUserForSidebar=async (req, res)=>{
	try {
		const userId= req.user._id;
		const filterdUsers= await User.find({_id: {$ne: userId}}).select("-password");

		// Count number of message not seen
		const unseenMessages= {}
		const promises= filterdUsers.map(async (user)=>{
			const message= await Message.find({senderId : user._id , receiverId: userId, seen: false })
			if(unseenMessages.length > 0){
				unseenMessages[user._id]=messages.length;
			}
		})
		await Promise.all(promises);
		res.json({success: true, user: filterdUsers, unseenMessages})


	} catch(error){
		console.log(error.message);
		res.json({success: false , message : error.message})

	}
}

