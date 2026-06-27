import { Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    'To Do': 'bg-slate-100 text-slate-800 border-slate-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'Done': 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  const priorityColors = {
    'Low': 'text-emerald-600',
    'Medium': 'text-amber-500',
    'High': 'text-rose-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-slate-900 truncate pr-4">{task.title}</h3>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => onEdit(task)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(task._id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-wrap gap-3 items-center text-sm mt-auto pt-4 border-t border-slate-100">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
          {task.status}
        </span>
        
        <div className="flex items-center text-slate-500 gap-1 ml-auto">
          <AlertCircle className={`h-4 w-4 ${priorityColors[task.priority]}`} />
          <span className="text-xs font-medium">{task.priority}</span>
        </div>
        
        <div className="flex items-center text-slate-500 gap-1">
          <Calendar className="h-4 w-4" />
          <span className="text-xs">{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
