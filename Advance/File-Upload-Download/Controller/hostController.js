const express = require("express");
const Home = require("../Models/home");
const fs = require('fs');


exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddHome = (req, res, next) => {
 
  const { houseName, price, location, rating,description } = req.body;
  const photoUrl = req.file.path;
  const home = new Home({houseName, price, location, rating, photoUrl,description});
  console.log(req.file)
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
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
     home: home,
     isLoggedIn: req.isLoggedIn,
     user: req.session.user,
   
    });
  })
  
}

exports.postEditHome = (req,res,next)=>{
  const {homeId, houseName, price, location, rating,description } = req.body;
  Home.findById(homeId).then(home=>{
    
    if(!home){
      return res.redirect("/host/host-home-list");
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    if (req.file) {
      // this delete previus photoUrl from file system when update new photo
       fs.unlink(home.photoUrl,(err)=>{

        if (err) {
            console.log('Error whiel deleting previous image in case of edit photo',err) 
        }})
      home.photoUrl = req.file.path;
    }
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

  Home.findByIdAndDelete(homeId).then((home)=>{
    res.redirect("/host/host-home-list")
    if (req.file) {
      fs.unlink(home.photoUrl,(err)=>{
        if (err) {
          console.log('Err from delet photoUrl from fs')
        }
      })
    }
    
  })
  .catch((error)=>{
    console.log("Error while deleting home",error)
  })
}
  