const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        requried: true,
    },

    image: {

        url: String,
        filename: String,

    },


    price: {
        type: Number,
        requried: true,
    },
    location: {
        type: String,
        requried: true,
    },
    country: {
        type: String,
        requried: true,
    },

    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {
        type: {
            type: String,
            enum: ['Point'], // location type must be a number
            required: true,
        },

        coordinates: {
            type: [Number],
            required: true,
        }

    },


});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

