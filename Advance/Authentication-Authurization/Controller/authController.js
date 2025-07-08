const {check, validationResult} = require("express-validator");
const User = require("../Models/users");
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    currentPage: "login",
    isLoggedIn:false,
    user:{},
  });
  
};

exports.postLogin = async(req,res,next)=>{

   const {email,password} =req.body;
   try{
    const user = await User.findOne({email});

    if (!user) {
      console.log("User not found")
      return res.status(422).render('auth/login',{
        pageTitle:'Login',
        currentPage:'login',
        isLoggedIn:false,
        errorMessages:["Data not found."],
        oldInput:{email:email,password:"",},
        user:{},
      })
    }
    const doMatch = await bcrypt.compare(password, user.password); // Assuming user.password stores the hashed password

    if (doMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user; // Store the user object in the session (optional but common)
      await req.session.save(); // Ensure session is saved before redirecting
      console.log('User logged in successfully:', user.email);
      return res.redirect('/');
    } else {
      console.log('Login failed: Incorrect password for user:', user.email);
      return res.status(422).render('auth/login', {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errorMessages: ["Invalid email or password."], // General message for security
        oldInput: {email: email,password: ''},
        user:{},
      });
    }
   }catch(err){
    console.log('error during login')
   }
}
exports.getSignup =(req,res,next)=>{
  res.render('auth/signUp',{
    pageTitle:'signUp',
    currentPage:'signup',
    isLoggedIn:false,
    errorMessages:[],
    oldInput:{name:"",email:"",password:"",userType:""},
    user:{},
  })
}
exports.postSignUp =[
  
  check("name")
  .trim()
  .isLength({min:5})
  .withMessage("Name should contain atleast 5 charector")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("Name should contain only alphabets"),

  check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  check("password")
  .isLength({min:5})
  .withMessage("Password contain atleast 5 charector")
  .matches(/[A-Za-z]/)
  .withMessage("Password contain atlest one uppercase & one lowercase")
  .matches(/[0-9]/)
  .withMessage("Password contain atlest on number")
  .trim(),
  
  check("confPassword")
  .custom((value,{req})=>{
    if (value !== req.body.password) {
      throw new Error("Password do not match")
    }
    return true;
  }),

  check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  .isIn(['user','host'])
  .withMessage("Invalid user type"),

  check("turmsAccept")
  .notEmpty()
  .withMessage("Please accept terms & conditions "),
  
  (req,res,next)=>{
    const {name,email,password,userType}=req.body;
    const errors =validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(422).render('auth/signUp',{
         pageTitle:'signUp',
         currentPage:'signup',
         isLoggedIn:false,
         errorMessages:errors.array().map(error =>error.msg),
         oldInput:{
          name,
          email,
          password,
          userType,
         },
         user:{},
      });
    }

    bcrypt.hash(password,12).then((hashedPassword)=>{
    const user = new User({name,email,password:hashedPassword,userType})
    return user.save()
    }).then(()=>{
      res.redirect("/login");
    }).catch((err)=>{
      res.status(422).render('auth/signUp',{
         pageTitle:'signUp',
         currentPage:'signup',
         isLoggedIn:false,
         errorMessages:[err.message],
         oldInput:{
          name,
          email,
          userType,
         },
         user:{},
      });
      console.log(err.message)
    })
    
}]

exports.postLogout =(req,res,next)=>{
  //res.cookie('isLoggedIn',false)
  req.session.destroy(()=>{
    res.redirect('/login')
  })
 
}