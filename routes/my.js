const express = require("express");
const router = express.Router();

const listingsStore = require("../store/listings");
const { checkFireBaseToken } = require("../middleware/auth");
const listingMapper = require("../mappers/listings");

router.get("/listings", checkFireBaseToken, (req, res) => {
  const listings = listingsStore.filterListings(
    (listing) => listing.userId === req.user.userId
  );
  const resources = listings.map(listingMapper);
  res.send(resources);
});

module.exports = router;
