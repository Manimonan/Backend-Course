const express = require("express");
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.postAddHome = (req, res, next) => {
 
  const { houseName, price, location, rating, photoUrl,description } = req.body;
  const home = new Home({houseName, price, location, rating, photoUrl,description});
  home.save().then(()=>{
    console.log("Home added successfully");
  });
  res.redirect("/host/host-home-list");
 
};

exports.getHomeList = (req, res, next) => {
   Home.find().then((registeredHomes)=>{
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-home-list",
    });
  });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true" ? true : false;
  Home.findById(homeId).then(home =>{
    if(!home){
      return res.redirect("/host/host-home-list");
     
    }
    res.render("host/edit-home", {
     pageTitle: "Edit host homes",
     currentPage: "host-home-list",
     editing: editing,
     home: home
   
    });
  })
  
}

exports.postEditHome = (req,res,next)=>{
  const {homeId, houseName, price, location, rating, photoUrl,description } = req.body;
  Home.findById(homeId).then(home=>{
    if(!home){
      return res.redirect("/host/host-home-list");
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;
    home.save().then((result)=>{
      console.log("Home updated successfully");
    }).catch((error)=>{
      console.log("Error while updating home",error);
    });
    
    res.redirect("/host/host-home-list");
  }).catch((error)=>{
    console.log("Error while finding home", error);
    
  })
 
   
}

exports.postDeleteHome =(req,res,next)=>{
  const homeId = req.params.homeId

  Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect("/host/host-home-list")
  })
  .catch((error)=>{
    console.log("Error while deleting home",error)
  })
}
  