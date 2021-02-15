const Joi = require("joi");

const schema = Joi.object({
  listingId: Joi.number().required(),
  message: Joi.string().required(),
});

module.exports = () => (req, res, next) => {
  try {
    Joi.assert(req.body, schema);
    next();
  } catch (error) {
    console.log("here");
    return res.status(400).send({ error: result.error.details[0].message });
  }

  // Joi.valid(req.body, schema);
  // Joi.isSchema
  // Joi.if(result.error);
};
