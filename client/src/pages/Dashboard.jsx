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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-tight">Minimalistic free<br/>task tracker<span className="text-brand-red">.</span></h1>
            <p className="text-gray-500 text-lg mt-4 max-w-xl">Stay focused on the main things without distraction. Interface is clear and intuitive.</p>
          </div>
          
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="flex items-center px-6 py-4 bg-brand-red text-white text-lg font-bold hover:bg-brand-red-hover transition-colors whitespace-nowrap mt-4 md:mt-0"
          >
            <Plus className="h-6 w-6 mr-2" />
            New Task
          </button>
        </div>

        {/* Filters and Search */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-brand-red transition-colors bg-transparent text-lg placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-4 shrink-0">
            <div className="flex items-center gap-2 border-b-2 border-gray-200 px-0 py-3 bg-white focus-within:border-brand-red transition-colors">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="focus:outline-none text-base font-medium text-gray-700 bg-transparent"
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
              className="border-b-2 border-gray-200 px-2 py-3 focus:outline-none text-base font-medium text-gray-700 bg-transparent focus:border-brand-red transition-colors"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            
            <select
              className="border-b-2 border-gray-200 px-2 py-3 focus:outline-none text-base font-medium text-gray-700 bg-transparent focus:border-brand-red transition-colors"
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
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand-red"></div>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="text-center py-32 bg-gray-50 border border-gray-100 border-dashed">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Clean<span className="text-brand-red">.</span></h3>
            <p className="text-gray-500 text-lg">No tasks found. Get started by creating a new task.</p>
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
