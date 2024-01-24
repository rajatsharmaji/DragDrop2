import User from './user.model.js'
import bcrypt from 'bcrypt'

export const addUserService = async(req,res)=>{
    console.log(req.body);
    const {name,password,email} = req.body;
    console.log(name,email,password);
    const hashPassword = await bcrypt.hash(password,5);
    const user = await new User({
        name,
        hashPassword,
        email,
    })
    await user.save();
    res.jason({msg:"new user created successfully", User: user})
}

export const getUserService = async()=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await user.findOne(email);
    if(!user) res.json({msg: "User does not exist"})
    else{
       const hashPassword = user.password;
       if(bcrypt.compare(hashPassword,password)) res.json({msg: "Login successful"})
       else{
            res.json({msg: "Incorrect password"})
        }
    }
}