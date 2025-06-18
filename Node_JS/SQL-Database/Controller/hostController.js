const express = require("express");
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.postAddHome = (req, res, next) => {
 
  const { houseName, price, location, ratting, photoURL,description } = req.body;
  const home = new Home(houseName, price, location, ratting, photoURL,description);
  home.save();
  res.redirect("/host/host-home-list");
 
};

exports.getHomeList = (req, res, next) => {
   Home.fetchAll().then(([registeredHomes])=>{
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
  const {id, houseName, price, location, ratting, photoURL,description } = req.body;
  const home = new Home(id,houseName, price, location, ratting, photoURL,description);
  home.save(); 
  res.redirect("/host/host-home-list");
   
}

exports.postDeleteHome =(req,res,next)=>{
  const homeId = req.params.homeId

  Home.deleteById(homeId).then(()=>{
    res.redirect("/host/host-home-list")
  })
  .catch((error)=>{
    console.log("Error while deleting home",error)
  })
}
  