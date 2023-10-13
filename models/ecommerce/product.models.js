import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import { Category } from "./category.models.js";
import {
  AvailableProductColors,
  ProductColorsEnum,
  AvailableProductBrands,
  ProductBrandsEnum,
} from "../../constants.js";

const productSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      required: true,
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    soldItems: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      // required: true,
    },
    brand: {
      type: String,
      enum: AvailableProductBrands,
      default: ProductBrandsEnum.APPLE,
    },
    mainImage: {
      // required: true,
      type: {
        url: String,
        localPath: String,
      },
      default: {},
    },
    subImages: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    color: {
      type: String,
      enum: AvailableProductColors,
      default: ProductColorsEnum.WHITE,
    },
    reviews: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          rating: {
            type: Number,
            min: 1,
            max: 5,
          },
          comment: String,
        },
      ],
      default: [],
    },

    // owner: {
    //   ref: "User",
    //   type: Schema.Types.ObjectId,
    // },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
