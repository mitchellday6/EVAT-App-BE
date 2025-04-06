import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    default: 'admin',
  },
  password: {
    type: String,
    default: 'admin',
  },
});

export default mongoose.model('Admin', adminSchema);
