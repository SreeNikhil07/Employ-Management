const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin ,validateListing} = require("../middleware.js");




//index route
router.get("/", wrapAsync(async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("\listings/index.ejs",{allListings});
}));

//New Route
router.get("/new", isLoggedin, (req, res) => {
    res.render("listings/new.ejs");
  });

//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: { path: "author",},}).populate("owner");
    if(!listing){
      req.flash("error", "employee Requested not found!");
      res.redirect("/listings");
    }
    
    res.render("listings/show.ejs", { listing });
  }));

  //Create Route
  router.post("/", isLoggedin, wrapAsync(async (req, res, next) => {
    try {
      const { email } = req.body.listing; // Extract email from the request body
  
      // Check if the email already exists
      const existingUser = await Listing.findOne({ email: email });
  
      if (existingUser) {
        // If the email already exists, send an error message
        req.flash('error', 'Employee already exists with this email');
        return res.redirect('/listings/new');  // Redirect back to the add new listing page
      }
  
      // Assuming Listing is your model
      const newListing = new Listing(req.body.listing); // Create a new listing from the body
      const result = await newListing.save(); // Save to the database
      
      req.flash("success", "Employee created successfully!"); // Flash success message
      res.redirect("/listings"); // After saving, redirect to the listings page
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }));
  
//Edit Route
router.get("/:id/edit", isLoggedin,wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error", "employee Requested not found!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));
//Update Route
router.put("/:id", isLoggedin, wrapAsync(async (req, res) => {
  try {
    const { id } = req.params;  // The listing ID to be updated
    const { email } = req.body.listing;  // Get the email from the form submission

    // Check if the email already exists but exclude the current listing
    const existingUser = await Listing.findOne({ email: email, _id: { $ne: id } });

    if (existingUser) {
      // If the email already exists for another user, send an error message
      req.flash('error', 'User already exists with this email');
      return res.redirect(`/listings/${id}/edit`);  // Redirect back to the edit page
    }

    // Update the listing if the email is unique
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // Redirect to the listings page with success message
    req.flash("success", "Employee updated successfully!");
    res.redirect('/listings');

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}));


//Delete Route
router.delete("/:id", isLoggedin, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
  }
  req.flash("success", "Employee Deleted!");
  res.redirect("/listings");
}));


module.exports = router;