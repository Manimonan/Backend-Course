const Favorites = require("../Models/favorites");
const Home = require("../Models/home");
exports.getHomes = (req, res, next) => {
   Home.fetchAll().then((homes) => {
    res.render("user/home-list", {
      registeredHomes: homes,
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
  Favorites.getFavorites().then((favorites)=>{
  // favorites is an array of favorite home IDs
   favorites = favorites.map(fav => fav.homeId); // Extract home IDs from favorites
    Home.fetchAll().then((homes) => {
    // Filter homes based on favorites
  
     const favoriteHome = homes.filter(home => favorites.includes(home._id.toString()));
     res.render("user/favorite-list",{
       favoriteHomes: favoriteHome,
       pageTitle: "My Favorite",
       currentPage: 'favorites', 
    })}
  )}
    
)}
exports.addToFavorites = (req,res,next)=>{
    const homeId = req.body.homeId;
    const fav = new Favorites(homeId); // Save the favorite home to the database
    fav.save().then((result)=>{
      console.log("Home added to favorites successfully", result);
    }).catch((err)=>{
      console.log("Error adding home to favorites", err);
    }).finally(()=>{
       res.redirect("/favorites");
      console.log("Finally block executed");
    })
  

}

exports.postRemoveFromFavorites = (req,res,next)=>{
   const homeId = req.params.homeId

  Favorites.deleteById(homeId).then((result)=>{
  console.log("Home removed from favorites successfully", result);
  }).catch((err)=>{
  console.log("Error removing home from favorites", err);
  }).finally(()=>{
    res.redirect("/favorites")
    console.log("Finally block executed");
  })

  
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
    });
    }
  
  } )
  
  
};

