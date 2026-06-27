const Task = require('../models/Task');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    // Add filtering and sorting capabilities
    const { status, priority, sortBy } = req.query;
    
    let query = { user: req.user.id };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    let sortOptions = { createdAt: -1 }; // default sort by newest
    if (sortBy === 'dueDate_asc') sortOptions = { dueDate: 1 };
    else if (sortBy === 'dueDate_desc') sortOptions = { dueDate: -1 };
    else if (sortBy === 'oldest') sortOptions = { createdAt: 1 };
    
    const tasks = await Task.find(query).sort(sortOptions);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Set task
// @route   POST /api/tasks
// @access  Private
const setTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    
    if (!title || !description || !dueDate) {
      res.status(400);
      throw new Error('Please provide title, description, and dueDate');
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || 'Medium',
      status: status || 'To Do',
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // This runs the schema validators on update
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
