const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


const listingController = require("../controllers/listings.js");
const multer = require("multer");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Change 2nd 
router.route("/")
    .get(wrapAsync(listingController.index))      // Index Route
    .post(isLoggedIn,validateListing, upload.single("image"), wrapAsync(listingController.createListing));  // Create Route
// .post(upload.single("image"),(req,res) => {
//     res.send(req.file);
// });

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForms);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))      // Show route 
    .put(isLoggedIn, isOwner, upload.single("image"), validateListing, wrapAsync(listingController.updateListing))     // Update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));    // delete route

//Edit route

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
module.exports = router;