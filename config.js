module.exports = {
  ENV: process.env.NODE_ENV || "development",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://Logan:logan1@ds211724.mlab.com:11724/image_gallery",
  PORT: process.env.PORT || 5000,
  PASS: process.env.PASS || "rockyisagoat"
};
