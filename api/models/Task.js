const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do',
    }
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate task titles for the same user
taskSchema.index({ user: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('Task', taskSchema);
