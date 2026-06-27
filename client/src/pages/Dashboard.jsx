import { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Navbar from '../components/Navbar';
import { Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { tasks, loading, fetchTasks, createTask, updateTask, deleteTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/login');
    }
  }, [user, navigate, authLoading]);

  useEffect(() => {
    if (user) {
      fetchTasks({ status: statusFilter, priority: priorityFilter, sortBy });
    }
  }, [user, fetchTasks, statusFilter, priorityFilter, sortBy]);

  const handleCreateOrUpdate = async (taskData) => {
    let success = false;
    if (editingTask) {
      success = await updateTask(editingTask._id, taskData);
    } else {
      success = await createTask(taskData);
    }
    if (success) {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Your Tasks</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track your tasks efficiently.</p>
          </div>
          
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus className="h-5 w-5 mr-1.5" />
            New Task
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-3 shrink-0">
            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-white">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                className="focus:outline-none text-sm text-slate-700 bg-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none text-sm text-slate-700 bg-white"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none text-sm text-slate-700 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dueDate_asc">Due Date (Earliest)</option>
              <option value="dueDate_desc">Due Date (Latest)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
            <h3 className="text-lg font-medium text-slate-900 mb-1">No tasks found</h3>
            <p className="text-slate-500">Get started by creating a new task.</p>
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
      />
    </div>
  );
};

export default Dashboard;
