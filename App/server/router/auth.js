import express from 'express';
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
const router = express.Router();
import authenticate from "../middleware/authenticate.js";
import axios from 'axios';



router.get('/',(req,res) => {res.send('Hello World from the server router');});

router.post('/register',(req,res) => 
{
    const {name , email , phone , pan , password, pan_image, aadhaar_image} = req.body;
    if (!name || !email || !phone || !pan || !password)
    {
        return res.status(442).json({error:"Please fill the field properly"});
    }
    User.findOne({email:email}).then((userExist) => 
    {
        if(userExist)
        {
            return res.status(442).json({error:"User already exists"});
        }
        const secret = speakeasy.generateSecret();
        
        const user = new User({name , email , phone , pan , password, secret,pan_image,aadhaar_image});
        user.save().then(()=>{res.status(201).json({secrets:secret});}).catch((err)=> res.status(500).json({error:err}));
    }
    
    ).catch(err => {console.log(err);});
}
);

router.post('/login',async(req,res)=>
{
    try
    {
        
        const {email,password,tokenmfa} = req.body;
        if(!email || !password || !tokenmfa)
        {
            return res.status(400).json({error:"Please fill the required fields"});
        }
        const userLogin = await User.findOne({email:email});
        
        if(userLogin)
        {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const tokenjwt = await userLogin.generateAuthToken();
           
            if(!isMatch)
            {
               
                res.status(400).json({error:"Invalid credentials"});
            }
            else
            {
                const si = userLogin.secret.base32;
                const verify = speakeasy.totp.verify({secret:si,encoding:'base32',token:tokenmfa });
                if(verify)
                {
               
                res.cookie("jwtoken",tokenjwt,{expires: new Date(Date.now() + 25892000000), httpOnly:true});
                res.json({message:"User signin succesfully"});
                }
                else
                {
                    
                    res.status(400).json({error:"Invalid credentials"});
                }
                
            }
        }
        else
        {
            res.status(400).json({error:"Invalid credentials"});
        }
    }
    catch(err)
    {
       console.log(err);
    }
}
);

router.get('/logout', (req,res) => {
     res.clearCookie('jwtoken',{path:'/'});
     res.status(200).send('User Logout');
});



router.post('/changepassword',async(req,res) => 
{
    try{
    const { emailf, tokenmfaf,passwordnewf} = req.body;
    if (!emailf || !passwordnewf || !tokenmfaf )
    {
        return res.status(442).json({error:"Please fill the field properly"});
    }


    const userLoginf =  await User.findOne({email:emailf});
        
        if(userLoginf)
        {
          
           

                const si = userLoginf.secret.base32;
                const verify =  speakeasy.totp.verify({secret:si,encoding:'base32',token:tokenmfaf });
                if(verify)
                {
                   
                    const filter = { email: emailf };
                    const passwordnewf2=await bcrypt.hash(passwordnewf,12);
                    const update = { password: passwordnewf2 };
                    await User.findOneAndUpdate(filter,update);
                    res.status(200).json({message:"Password changed succesfully"});
                }
                else
                {
                    res.status(400).json({error:"Invalid credentials"});
                }
        }
        else
        {
            res.status(400).json({error:"Invalid credentials"});
        }
    }
    catch(err)
    {
        console.log(err)
    }
   
}
);



router.get('/about',authenticate, (req,res) => {
      res.send(req.rootUser);
});

router.post('/chatbot',async(req,res) => 
{
   const {messager} = req.body;
   var t;
   axios.post('https://myfischatbot.herokuapp.com/webhooks/rest/webhook', {"sender": "abc", "message": messager})
  .then((response) => {
    t=response.data[0].text;
    console.log(response.data[0].text);
    res.json({error:response.data[0].text});
  }, (error) => {
    console.log(error);
  });
    
   
}
);

router.post('/score',async(req,res) =>
{

    const {message} = req.body;
    
    await axios.post('https://predict-plus-recommender.herokuapp.com/user_score', message)
  .then((response) => {
   /*onsole.log(response.data);*/
    res.json(response.data);

  }, (error) => {
    /*console.log(error);*/
  });

})

router.get('/performance_based',(req,res) =>
{

   
    
    axios.get('https://predict-plus-recommender.herokuapp.com/performance_based?mf_category=Debt%20Scheme&mf_sub_category=Liquid&risk=Moderate&top_n=5&load_cache=False')
  .then((response) => {
  
   console.log(response.data);
   res.json({"row1":response.data[0] , "row2":response.data[1] , "row3":response.data[2] , "row4":response.data[3] , "row5":response.data[4] });
  }, (error) => {
    
  });

})


router.get('/popularity_based',(req,res) =>
{

   
    
    axios.get('https://predict-plus-recommender.herokuapp.com/popularity_based?mf_category=Debt%20Scheme&mf_sub_category=Liquid&risk=Moderate&top_n=5&load_cache=False')
  .then((response) => {
  
   /*console.log(response.data);*/
   res.json({"row1":response.data[0] , "row2":response.data[1] , "row3":response.data[2] , "row4":response.data[3] , "row5":response.data[4] });
  }, (error) => {
    
  });

})






export default router;