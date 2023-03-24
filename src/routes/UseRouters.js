const express = require("express");
const {
  newsdetail,
  careerDetail,
  blogdetail,
  careerPost,
  newsDetail,
  productDetail,
  projectDetail,
  contactPost,
  galleryDetail,
  sliderDetail,
  subscriptionPost,
  galleryDetail1,
  galleryDetail2,
  galleryDetail3,
  partsDetails,
  applyDetail,
  applyPost,
  videoDetail,
  productFRP,
  productWooden,
  productGearbox,
  productFRPFan,
  productRCCTower,
  enquieryAdd,
  enquieryPost,
} = require("../controller/useController");
const router = express.Router();
const session = require("express-session")
const config=require('../../config/config')
var bodyParser = require('body-parser');

router.use(session({secret:config.sessionSecret,saveUninitialized: true, resave: false}))

// import miiddleware here
const auth = require("../../middleware/auth")

// use body parser here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


 // for ejs files
// router.set("view engine", "ejs");
// router.set("views", "./views");

// for contoller files
const userController = require("../controller/UseController");
const News = require("../models/news");

//  router.get('/login',auth.isLogout,userController.)


// router.get('/login', auth.isLogout,  userController.loginLoad)
// router.get('/admin',auth.isLogin, userController.loadHome)
// router.get('/logout',auth.isLogin, userController.userLogout)
// router.post('/login',userController.verifyLogin)



// news get api

router.get("/newsget",newsdetail)
//  Bloag api
router.get("/getapi", blogdetail);

// career api
router.get("/Careerget", careerDetail);

router.post("/CareerPost", careerPost);
// News api
router.get("/Newsget", newsDetail);

// Product api
router.get("/Productget", productDetail);

// Enquiery api
router.get("/Enquieryget", enquieryAdd);

// Product api
router.get("/ProductFRPget", productFRP);

// Product api
router.get("/ProductWoodenget", productWooden);

// Product api
router.get("/Productgearbox", productGearbox);

// Product api
router.get("/ProductFRPFan", productFRPFan);

// Product api
router.get("/ProductRccTower", productRCCTower);

// Project api
router.get("/Projectget", projectDetail);

//Contact us api
router.post("/ContactPost", contactPost);

//Apply  api
router.get("/Applyget", applyDetail);

// ApplyPost
router.post("/process-apply-form", applyPost);


// ApplyPost
router.post("/EnquieryPost", enquieryPost);

// Video  api
router.get("/Videoget", videoDetail);

//gellery get api
// router.get("/Galleryget", GalleryDetail);

router.get('/Galleryget',galleryDetail)


//gellery1 get api
router.get("/Galleryget1", galleryDetail1);

//gellery2 get api
router.get("/Galleryget2", galleryDetail2);

//gellery3 get api
router.get("/Galleryget3", galleryDetail3);

//Parts get api
router.get("/Partsget", partsDetails);

//slider get api
router.get("/SliderGet", sliderDetail);

router.post("/SubPost", subscriptionPost);
module.exports = router;
