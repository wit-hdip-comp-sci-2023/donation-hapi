import Mongoose from "mongoose";

const { Schema } = Mongoose;

const donationSchema = new Schema({
  amount: Number,
  method: String,
  lat: String,
  lng: String,
  donor: String,
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  },
});

export const Donation = Mongoose.model("Donation", donationSchema);
