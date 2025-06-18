const express = require("express");
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.postAddHome = (req, res, next) => {
 
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save().then(()=>{
    console.log("Home added successfully");
  });
  res.redirect("/host/host-home-list");
 
};

exports.getHomeList = (req, res, next) => {
   Home.fetchAll().then((homes) => {
    res.render("host/host-home-list", {
      registeredHomes:homes,
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
  const {homeId, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home._id = homeId; // set the id to the home object so that it can be updated
  home.save().then(()=>{
    console.log("Home updated successfully");
  }).catch(error =>{
    console.log("Error while updating home", error);
  });
 
  res.redirect("/host/host-home-list");
   
}

exports.postDeleteHome =(req,res,next)=>{
  const homeId = req.params.homeId

  Home.findByIdAndDelete(homeId,error =>{
    if (error) {
      console.log('Error while deleting homes')
    }
  });
 res.redirect("/host/host-home-list");
}
  