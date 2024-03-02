import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please Provide a id"],
  },
  title: {
    type: String,
    required: [true, "Please Provide a title"],
    maxLength: [40, "Title cannot be more than 40 characters"],
  },
  description: {
    type: String,
    required: true,
    maxLength: [200, "Description cannot be more than 200 characters"],
  },
  color: {
    type: String,
    default: "#fffff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Note", NoteSchema);
