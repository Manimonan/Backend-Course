//const Favorites = require("../Models/favorites");
const Home = require("../Models/home");
const User = require("../Models/users");
exports.getHomes = (req, res, next) => {
   Home.find().then((registeredHomes)=>{
       
        res.render("user/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
    });
   });
};

exports.getBookings = (req, res, next) => {
   
    res.render("user/booking", {
      pageTitle: "My Bookings",
      currentPage: 'bookings',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  
};

exports.getFavourites = async(req, res, next)=>{
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favourites');
    res.render("user/favorite-list",{
       favoriteHomes: user.favourites,
       pageTitle: "My Favorite",
       currentPage: 'favorites', 
       isLoggedIn: req.isLoggedIn,
       user: req.session.user,
    })
}
exports.postAddToFavorites = async(req,res,next)=>{
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId)
    await user.save()
  }
   res.redirect("/favourites");
};

exports.postRemoveFromFavorites = async(req,res,next)=>{
   const homeId = req.params.homeId;
   const userId = req.session.user._id;
   const user = await User.findById(userId);
   if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav=>fav != homeId)
    await user.save();
   }
  res.redirect("/favourites")
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home)=>{
    if(!home){
      res.redirect("/"); // Redirect to home page if home not found
    }else{
      console.log("Home details found ",home)
      res.render("user/home-details", {
      home: home,
      pageTitle: "Home Details",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })}
  }).catch((error)=>{
        console.log("Error while feaching details",error)
  }) 
};

