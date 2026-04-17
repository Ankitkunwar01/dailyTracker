import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  completedIds: { type: [String], default: [] },
  notes: { type: Map, of: String, default: {} },
  streak: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
