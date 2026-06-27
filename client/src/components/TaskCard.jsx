import { Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    'To Do': 'text-gray-500',
    'In Progress': 'text-brand-red font-bold',
    'Done': 'text-gray-300 line-through'
  };

  const priorityColors = {
    'Low': 'text-gray-400',
    'Medium': 'text-gray-600',
    'High': 'text-brand-red font-bold'
  };

  return (
    <div className="bg-white border-2 border-gray-100 p-8 hover:border-brand-red transition-colors group relative">
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-bold truncate pr-4 ${task.status === 'Done' ? 'text-gray-400' : 'text-gray-900'}`}>{task.title}</h3>
        <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 bg-white px-2">
          <button onClick={() => onEdit(task)} className="p-2 text-gray-400 hover:text-brand-red transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(task._id)} className="p-2 text-gray-400 hover:text-brand-red transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className={`text-base mb-8 line-clamp-3 ${task.status === 'Done' ? 'text-gray-400' : 'text-gray-600'}`}>{task.description}</p>
      
      <div className="flex flex-wrap gap-6 items-center text-sm mt-auto pt-6 border-t-2 border-gray-100">
        <span className={`text-sm ${statusColors[task.status]}`}>
          {task.status}
        </span>
        
        <div className="flex items-center text-gray-500 gap-2 ml-auto">
          <AlertCircle className={`h-4 w-4 ${priorityColors[task.priority]}`} />
          <span className={`text-sm ${priorityColors[task.priority]}`}>{task.priority}</span>
        </div>
        
        <div className="flex items-center text-gray-400 gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
