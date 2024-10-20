import User from "../model/users.model.js";
import bcryptjs from "bcryptjs";
export const signup= async(req,res)=>{
    try{
        const {fullname,email,password}=req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already Exist"});
        }
    const hashPassword= await bcryptjs.hash(password,10);
    const createdUser = new User({
        fullname: fullname,
        email: email,
        password: hashPassword,
    })
    await createdUser.save()
    res.status(201).json({message:"user created succesfully",user:{
        _id:createdUser._id,
        fullname:createdUser.fullname,
        email:createdUser.email,

    } });
    } catch(error){
        console.log("error : ",error.message);
        res.status(500).json({message: "internal server error "});
    }
};

export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email})
        const isMatch= await bcryptjs.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({message:" invalid credentials"})
        }
        else{
            return res.status(200).json({message:"login successfull",user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email
            }})
        }
    } catch(error){
        console.log("Error : ",error);
        res.status(500).json({message: "internal server error "});
    }
}