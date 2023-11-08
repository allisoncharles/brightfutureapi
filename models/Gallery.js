import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    galleryTitle: { type: String, required: true },
    galleryImg: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
