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
exports.postSignUp =(req,res,next)=>{
  console.log(req.body);
  res.redirect("/login")
}

exports.postLogout =(req,res,next)=>{
  //res.cookie('isLoggedIn',false)
  req.session.destroy(()=>{
    res.redirect('/login')
  })
 
}