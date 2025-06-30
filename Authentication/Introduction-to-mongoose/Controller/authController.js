exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login/singUp",
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

exports.postLogout =(req,res,next)=>{
  //res.cookie('isLoggedIn',false)
  req.session.destroy(()=>{
    res.redirect('/login')
  })
 
}