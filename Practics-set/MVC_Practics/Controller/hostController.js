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
  home.save();
  res.redirect("/host/host-home-list");
 
};

exports.getHomeList = (req, res, next) => {
   Home.fetchAll((registeredHomes) => {
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
  Home.findById(homeId, home =>{
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
  home.id = homeId; // set the id to the home object so that it can be updated
  home.save(); 
 
  res.redirect("/host/host-home-list");
   
}

exports.postDeleteHome =(req,res,next)=>{
  const homeId = req.params.homeId

  Home.deleteById(homeId,error =>{
    if (error) {
      console.log('Error while deleting homes')
    }
  });
 res.redirect("/host/host-home-list");
}
  