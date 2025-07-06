const {check} = require("express-validator")
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    currentPage: "login",
    isLoggedIn:false,
  });
  
};

exports.postLogin =(req,res,next)=>{
  req.session.isLoggedIn = true;
  //res.cookie("isLoggedIn",true)
  //req.isLoggedIn = true;
  res.redirect('/')
}
exports.getSignup =(req,res,next)=>{
  res.render('auth/signUp',{
    pageTitle:'signUp',
    currentPage:'signup',
    isLoggedIn:false,
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
  .isIn(['guest','host'])
  .withMessage("Invalid user type"),

  check("terms")
  .notEmpty()
  .withMessage("Please accept terms & conditions ")
  .custom((value,{req})=>{
    if (value !== "on") {
      throw new Error("Please accept terms & conditions")
    }
    return true;
  }),
  
  (req,res,next)=>{
  console.log(req.body);
  res.redirect("/login")
}]

exports.postLogout =(req,res,next)=>{
  //res.cookie('isLoggedIn',false)
  req.session.destroy(()=>{
    res.redirect('/login')
  })
 
}