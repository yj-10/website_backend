const asynchandler = require("express-async-handler");
const express = require("express");
const Blog = require("../models/Blogdetails");
const Career = require("../models/career");
const Contact = require("../models/contact");
const Gallery = require("../models/gallery");
const Product = require("../models/product");
const Project = require("../models/project");
const Slider = require("../models/slider");
const Subscription = require("../models/Subscription");
const Gallery1 = require("../models/gallery1");
const Gallery2 = require("../models/gallery2");
const Gallery3 = require("../models/gallery3");
const Parts = require("../models/parts");
const Apply = require("../models/apply");
const Video = require("../models/video");
const news = require("../models/news")
const Product1 = require("../models/product1");
const Product2 = require("../models/product2");
const Product3 = require("../models/product3");
const Product4 = require("../models/product4");
const Product5 = require("../models/product5");
const Enquiry = require("../models/enquiry");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const Login = require("../models/login");
const { generateToken } = require("../../common/token");
// const mongoose=require("mongoose")
// const fs=require('fs')

// module.exports=class Gallery{
//   static User=async(req,res)=>{
//     let payload=req.body

//     var imgurl="";
//     if(req.file) var imgurl=`Storage/public/images/${req.file.filename}`
//     payload.images=imgurl
//     try{
//       const userCreate=await new User(payload).save()
//     }
//   }
// }

//* PASSWORD HASHING FUNCTION USING BCRYPT
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

//Blog get api
const blogdetail = asynchandler(async (req, res) => {
  const apiblog = await Blog.find();
  if (apiblog) {
    return res.status(200).json({ msg: apiblog });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//News get api
const newsdetail = asynchandler(async (req, res) => {
  const apinews = await news.find();
  if (apinews) {
    return res.status(200).json({ msg: apinews });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});


//Blog get api

// Career post api
const careerDetail = asynchandler(async (req, res) => {
  const Careerapi = await Career.find();
  if (Careerapi) {
    return res.status(200).json({ msg: Careerapi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});
//Career Post api

const careerPost = asynchandler(async (req, res) => {
  // return res.json(req.body);
  const apiCareer = await Career.create(req.body);
  const result = await apiCareer.save();
  if (result) {
    return res.status(200).json({ msg: result });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

// Career get api end

// news get api start
const newsDetail = asynchandler(async (req, res) => {
  const ProductApi = await Product.find();
  if (ProductApi) {
    return res.status(200).json({ msg: ProductApi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

// news get api end

// * login user method started

const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

// const verifyLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userData = await Login.findOne({ email: email });

//     if (userData) {

//       const passwordMatch = await bcrypt.compare(password, userData.password);

//       if (passwordMatch) {
//         if (userData.is_varified === 0) {
//           res.render("login", { message: "Please verify your mail" });
//         } else {
//           // middleware auth.js (req.session.user_id)
//           req.session.user_id = userData._id;
//           res.render("admin");
//         }
//       } else {
//         res.render("login", { message: "email and password is incorrect" });
//       }
//     } else {
//       res.render("login", { message: "email and password is incorrect" });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("request--->", req.body)
    if (email === "") {
      return res.status(409).json({
        status: 409,
        message: "Please enter your email address",
      });
    } else if (password === "") {
      return res.status(409).json({
        status: 409,
        message: "Please enter your password",
      });
    }

    const user = await Login.findOne({ email: email });
    // console.log("user--->", user)

    if (!user) {
      return res.status(409).json({
        status: 409,
        message: "Email is incorrect",
      });
    }

    const Upassword = await Login.findOne({ password: password });
    if (!Upassword) {
      return res.status(409).json({
        status: 409,
        message: "Password is incorrect",
      });
    }
    const token = await generateToken({
      id: user,
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // res.render("admin");
    // res.redirect("/admin");
    return res.status(200).json({
      status: 200,
      message: "User login",
      token: token,
    });
  } catch (error) {
    console.log("error-->", error.message);
    return res.status(500).json({
      status: 500,
      message: "Error",
    });
  }
};

const loadHome = async (req, res) => {
  try {
    const userData = await Login.findById({ _id: req.session.user_id });
    res.render("admin", { user: userData });
    // res.status(200).json({status:200,data:userData})
  } catch (error) {
    console.log(error.message);
  }
};

// logout

// const userLogout= async(req,res)=>{
//   try {
//     res.clearCookie("adminSession");
//     // return res.status(200).json({
//     //   status:200,
//     //   message:"user logout"
//     // })
//     return res.redirect("/login")

//   } catch (error) {
//     console.log(error.message)
//     // return res.status(500).json({
//     //   status: 500,
//     //   message: "Error"
//     // })

//   }
// }

//logout for authentication

const logoutdata = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.status(200).json({
      status: 200,
      message: " Logout successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: " Logout successfully",
    });
  }
};

//logout for authentication

const userLogout = async (req, res) => {
  try {
    // res.redirect("/login");
    res.cookie("token", {
      expires: new Date(0),
    });
    // res.clearCookie("token");
  } catch (error) {
    console.log(error.message);
  }
};

//Project get api start

const projectDetail = asynchandler(async (req, res) => {
  const apiProject = await Project.find();
  if (apiProject) {
    return res.status(200).json({ msg: apiProject });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

// Project get api end

//Product get api details
const productDetail = asynchandler(async (req, res) => {
  const ApiPRoduct = await Product.find();
  if (ApiPRoduct) {
    return res.status(200).json({ msg: ApiPRoduct });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//ProductDetail1 get api

const productFRP = asynchandler(async (req, res) => {
  const Product1api = await Product1.find();
  if (Product1api) {
    return res.status(200).json({ msg: Product1api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});
//ProductDetail1 get api

const productWooden = asynchandler(async (req, res) => {
  const Product2api = await Product2.find();
  if (Product2api) {
    return res.status(200).json({ msg: Product2api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});
//ProductDetail3 get api

const productGearbox = asynchandler(async (req, res) => {
  const Product3api = await Product3.find();
  if (Product3api) {
    return res.status(200).json({ msg: Product3api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});
//ProductDetail3 get api

const productFRPFan = asynchandler(async (req, res) => {
  const Product4api = await Product4.find();
  if (Product4api) {
    return res.status(200).json({ msg: Product4api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});
//ProductDetail3 get api

const productRCCTower = asynchandler(async (req, res) => {
  const Product5api = await Product5.find();
  if (Product5api) {
    return res.status(200).json({ msg: Product5api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//EnquieryDetail get api

const enquieryAdd = asynchandler(async (req, res) => {
  const Enquieryapi = await Enquiry.find();
  if (Enquieryapi) {
    return res.status(200).json({ msg: Enquieryapi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

const galleryDetail = asynchandler(async (req, res) => {
  const GalleryApi = await Gallery.find();
  if (GalleryApi) {
    return res.status(200).json({ msg: GalleryApi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//GalleryDetail get api

const videoDetail = asynchandler(async (req, res) => {
  const VideoApi = await Video.find();
  if (VideoApi) {
    return res.status(200).json({ msg: VideoApi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//ApplyDetail get api

const applyDetail = asynchandler(async (req, res) => {
  const ApplyApi = await Apply.find();
  if (ApplyApi) {
    return res.status(200).json({ msg: ApplyApi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

// Apply Post api
const applyPost = asynchandler(async (req, res) => {
  const AppApi = await Apply.create(req.body);
  const result = await AppApi.save();

  if (result) {
    return res.status(200).json({ msg: result });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//GalleryDetail get api

const galleryDetail1 = asynchandler(async (req, res) => {
  const Gallery1api = await Gallery1.find();
  if (Gallery1api) {
    return res.status(200).json({ msg: Gallery1api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});
//GalleryDetail get api

const galleryDetail2 = asynchandler(async (req, res) => {
  const Galley2api = await Gallery2.find();
  if (Galley2api) {
    return res.status(200).json({ msg: Galley2api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});
//GalleryDetail get api

const galleryDetail3 = asynchandler(async (req, res) => {
  const Galley3api = await Gallery3.find();
  if (Galley3api) {
    return res.status(200).json({ msg: Galley3api });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//GalleryDetail get api

const partsDetails = asynchandler(async (req, res) => {
  const Partsapi = await Parts.find();
  if (Partsapi) {
    return res.status(200).json({ msg: Partsapi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

// Contact Post api
const contactPost = asynchandler(async (req, res) => {
  const ContApi = await Contact.create(req.body);
  const result = await ContApi.save();

  if (result) {
    return res.status(200).json({ result });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

// slider api
const sliderDetail = asynchandler(async (req, res) => {
  const SliderApi = await Slider.find();
  if (SliderApi) {
    return res.status(200).json({ msg: SliderApi });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

//EnquieryPost get api

const enquieryPost = asynchandler(async (req, res) => {
  const EnqPostapi = await Enquiry.create(req.body);
  const result = await EnqPostapi.save();
  if (result) {
    return res.status(200).json({ msg: result });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

const subscriptionPost = asynchandler(async (req, res) => {
  const Subscriptionapi = await Subscription.create(req.body);
  const result = await Subscriptionapi.save();
  if (result) {
    return res.status(200).json({ msg: result });
  } else {
    return res.status(400).json({ msg: "error" });
  }
});

module.exports = {
  careerDetail,
  blogdetail,
  newsDetail,
  projectDetail,
  galleryDetail,
  sliderDetail,
  subscriptionPost,
  contactPost,
  careerPost,
  galleryDetail1,
  galleryDetail2,
  galleryDetail3,
  partsDetails,
  applyDetail,
  applyPost,
  videoDetail,
  productDetail,
  productFRP,
  productWooden,
  productGearbox,
  productFRPFan,
  productRCCTower,
  enquieryAdd,
  enquieryPost,
  loginLoad,
  loadHome,
  userLogout,
  verifyLogin,
  logoutdata,
  newsdetail
};
