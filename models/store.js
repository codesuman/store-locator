const mongoose = require('mongoose');
const geoCoder = require("../utils/geocoder");

const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        trim: true,
        required: [true, 'Please add a Store ID'],
        unique: true,
        maxlength: [10, 'Store ID must be less than 10 chars']
    },
    address: {
        type: String,
        required: [true, "Please add an address"]
    },
    formattedAddress: {
        type: String
    },
    location: {
        // https://docs.mongodb.com/manual/reference/geojson/
        // GeoJSON type [Point, LineString, Polygon, MultiPoint]
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'] // 'location.type' must be 'Point'
        },
        // GeoJSON Points
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

// Geo-code & create location field
StoreSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.address);

  console.log(`Location details :`);
  console.dir(loc);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    street: loc[0].streetName,
    state: loc[0].streetCode,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
    formattedAddress: loc[0].formattedAddress
  };

  next();
});

module.exports = mongoose.model("Store", StoreSchema);