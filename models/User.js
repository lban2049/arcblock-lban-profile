import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model('users', userSchema, 'users');
