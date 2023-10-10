/*
    #name - String
    #role - String
    #reportsTo - ObjectID

    ------------------------------------- 
    ------------------
*/

import { Schema, models, model, Types } from "mongoose";

const personnelSchema = new Schema(
  {
    name: String,
    role: String,
    reportsTo: String,
    index: Number,
  },
  { timestamps: true }
);

const Personnel = models.Personnel || model("Personnel", personnelSchema);

export default Personnel;
