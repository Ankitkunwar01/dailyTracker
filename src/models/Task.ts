import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  email: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  date: { type: String, required: true }, // Format "Fri Apr 17 2026"
}, { timestamps: true });

// Indexing for faster queries by email and date
TaskSchema.index({ email: 1, date: 1 });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
