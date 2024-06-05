const express = require("express");
const router = express.Router();
console.log(__dirname);
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");
// index & create routes
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));



//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show Route,Update Route,Delete Route
router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put( 
isLoggedIn,
isOwner,
upload.single("listing[image]"),
validateListing,
wrapAsync (listingController.updateListing))
.delete( 
isLoggedIn,
isOwner,
wrapAsync (listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;
