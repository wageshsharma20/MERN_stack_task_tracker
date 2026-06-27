import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'To Do',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        status: 'To Do',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/90 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl overflow-hidden border-2 border-gray-100 p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-8 top-8 text-gray-400 hover:text-brand-red transition-colors p-2">
          <X className="h-6 w-6" />
        </button>
        <div className="mb-12">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            {initialData ? 'Edit Task' : 'Create Task'}<span className="text-brand-red">.</span>
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
              <input
                type="text"
                className={`w-full px-0 py-3 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-colors text-lg placeholder-gray-400 ${errors.title ? 'border-brand-red' : 'border-gray-200 focus:border-brand-red'}`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Task title"
              />
              {errors.title && <p className="text-brand-red text-sm mt-2 font-medium">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
              <textarea
                className={`w-full px-0 py-3 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-colors text-lg placeholder-gray-400 min-h-[100px] resize-y ${errors.description ? 'border-brand-red' : 'border-gray-200 focus:border-brand-red'}`}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add more details..."
              />
              {errors.description && <p className="text-brand-red text-sm mt-2 font-medium">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Due Date</label>
                <input
                  type="date"
                  className={`w-full px-0 py-3 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-colors text-lg text-gray-700 ${errors.dueDate ? 'border-brand-red' : 'border-gray-200 focus:border-brand-red'}`}
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
                {errors.dueDate && <p className="text-brand-red text-sm mt-2 font-medium">{errors.dueDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Priority</label>
                <select
                  className="w-full px-0 py-3 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:ring-0 focus:border-brand-red transition-colors text-lg text-gray-700"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            
            {initialData && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <select
                  className="w-full px-0 py-3 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:ring-0 focus:border-brand-red transition-colors text-lg text-gray-700"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="pt-8 flex flex-col md:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 text-base font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-4 text-base font-bold text-white bg-brand-red hover:bg-brand-red-hover transition-colors text-center"
            >
              {initialData ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
