import mongoose from "mongoose";

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: { fileName: string; originalName: string };
  category: string;
  description: string;
  price: number;
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  image: { type: imageSchema, required: true },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
});

export default mongoose.model<IProduct>("product", productSchema);
