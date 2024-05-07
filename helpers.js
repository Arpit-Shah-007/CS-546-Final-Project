import Handlebars from "handlebars";

// Define the Handlebars helper function for equality comparison
Handlebars.registerHelper("eq", function (userId, comment, options) {
  return userId === comment.userId._id.toString()
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("isCurrentUserComment", function (userId, comment) {
  return userId === comment.userId._id.toString();
});

export default Handlebars;
