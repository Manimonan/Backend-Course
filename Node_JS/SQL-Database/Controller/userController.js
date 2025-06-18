const Favorites = require("../Models/favorites");
const Home = require("../Models/home");
exports.getHomes = (req, res, next) => {
   Home.fetchAll().then(([registeredHomes])=>{
       console.log(registeredHomes)
        res.render("user/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "Home",
    });
   });
};

exports.getBookings = (req, res, next) => {
   
    res.render("user/booking", {
      pageTitle: "My Bookings",
      currentPage: 'bookings',
    });
  
};

exports.getFavorites = (req, res, next)=>{
  Favorites.getFavorites((favorites)=>{
   Home.fetchAll().then(([registeredHomes])=>{
     const favoriteHome = registeredHomes.filter(home => favorites.includes(home.id));
     res.render("user/favorite-list",{
       favoriteHomes: favoriteHome,
       pageTitle: "My Favorite",
       currentPage: 'favorites', 
    })
    }
  )}
    
)}
exports.addToFavorites = (req,res,next)=>{
  console.log("Adding to favorites",req.body);
  Favorites.addtofavorites(req.body.homeId,(err)=>{
    if(err){
      console.log("Error adding to favorites");
      
    }else{
      console.log("Home added to favorites successfully");
    }

  })
  res.redirect("/favorites");
  // Here you would typically handle adding the home to the user's favorites list

}

exports.postRemoveFromFavorites = (req,res,next)=>{
   const homeId = req.params.homeId

  Favorites.deleteById(homeId,error={
    if (error) {
      console.log('Error remove from favorites',error)
    }
  })
res.redirect("/favorites")
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([rows])=>{
     const home = rows[0]
    if(!home){
      res.redirect("/"); // Redirect to home page if home not found
    }else{
      console.log("Home details found ",home)
      res.render("user/home-details", {
      home: home,
      pageTitle: "Home Details",
      currentPage: "Home",
    })}
  }).catch((error)=>{
        console.log("Error while feaching details",error)
  }) 
};

