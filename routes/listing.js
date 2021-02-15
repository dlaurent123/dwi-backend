const express = require("express");
const router = express.Router();

const store = require("../store/listings");
const { checkFireBaseToken } = require("../middleware/auth");
const listingMapper = require("../mappers/listings");

router.get("/:id", checkFireBaseToken, (req, res) => {
  const listing = store.getListing(parseInt(req.params.id));
  if (!listing) return res.status(404).send();
  const resource = listingMapper(listing);
  res.send(resource);
});

module.exports = router;
