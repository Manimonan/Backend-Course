const Favorites = require("../Models/favorites");
const Home = require("../Models/home");
exports.getHomes = (req, res, next) => {
   Home.find().then((registeredHomes)=>{
       
        res.render("user/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
    });
   });
};

exports.getBookings = (req, res, next) => {
   
    res.render("user/booking", {
      pageTitle: "My Bookings",
      currentPage: 'bookings',
      isLoggedIn: req.isLoggedIn,
    });
  
};

exports.getFavorites = (req, res, next)=>{
  Favorites.find() // Find all favorites
  .populate('homeId') // Populate the homeId field with Home documents
  .then((favId)=>{
    const favorites = favId.map(fav => fav.homeId);
   
     res.render("user/favorite-list",{
       favoriteHomes: favorites,
       pageTitle: "My Favorite",
       currentPage: 'favorites', 
       isLoggedIn: req.isLoggedIn,
    })
  })  
}
exports.postAddToFavorites = (req,res,next)=>{
  const homeId = req.body.homeId;
  Favorites.findOne({homeId:homeId}).then((favId)=>{
    if(favId){
      console.log("Home already in favorites");
      return res.redirect("/");
    }
    const favorite = new Favorites({homeId: homeId});
    favorite.save().then(()=>{
      console.log("Home added to favorites");
      res.redirect("/favorites");
    }).catch((error)=>{
      console.log("Error while adding to favorites", error);
      res.redirect("/favorites");
    });
  })
 
  

}

exports.postRemoveFromFavorites = (req,res,next)=>{
   const homeId = req.params.homeId

  Favorites.findOneAndDelete({homeId:homeId}).then(result=>{
    if (!result) {
      console.log('Error remove from favorites')
    }
  })
  res.redirect("/favorites")
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
    })}
  }).catch((error)=>{
        console.log("Error while feaching details",error)
  }) 
};

