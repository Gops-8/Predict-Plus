import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: Number,
        required: true,
        unique:true
    },
    pan: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    secret:{
        type: Object,
        required: true
    },
    pan_image: { type: Buffer },
    aadhaar_image: { type: Buffer },
    tokens:[
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});


userSchema.pre('save', async function(next) {
   if(this.isModified('password'))
   {
      this.password = await bcrypt.hash(this.password,12);
   }
   next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        
      let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
    }catch(err)
    {
      console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

export default User;