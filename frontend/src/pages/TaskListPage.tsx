// Task list page: shows tasks for the logged-in user with controls to edit/delete/toggle.
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/client';
import { type RootState, type AppDispatch } from '../store/store';
import { logout } from '../store/authSlice';
import { removeTask, setTasks, updateTask } from '../store/tasksSlice';

const TaskListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await api.get('/tasks');
        dispatch(setTasks(res.data));
      } catch (err: any) {
        const message = err.response?.data?.error ?? 'Failed to load tasks';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      dispatch(removeTask(id));
    } catch (err: any) {
      const message = err.response?.data?.error ?? 'Failed to delete task';
      alert(message);
    }
  };

  const handleToggleStatus = async (id: number, current: 'pending' | 'completed') => {
    try {
      const res = await api.put(`/tasks/${id}`, {
        status: current === 'pending' ? 'completed' : 'pending',
      });
      dispatch(updateTask(res.data));
    } catch (err: any) {
      const message = err.response?.data?.error ?? 'Failed to update task';
      alert(message);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  My Tasks
                </h1>
                {user && (
                  <p className="text-slate-600 flex items-center gap-2">
                    <span>👤</span> {user.username}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/tasks/new"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <span>➕</span> New Task
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white border-2 border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transform hover:scale-105 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-slate-900">{tasks.length}</div>
            <div className="text-slate-600">Total Tasks</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="text-3xl font-bold text-slate-900">{pendingTasks.length}</div>
            <div className="text-slate-600">Pending</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
            <div className="text-3xl font-bold text-slate-900">{completedTasks.length}</div>
            <div className="text-slate-600">Completed</div>
          </div>
        </div>

        {/* Loading & Error */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
            <p className="text-slate-600">Loading tasks...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 flex items-center gap-2">
              <span>⚠️</span> {error}
            </p>
          </div>
        )}

        {/* Tasks List */}
        {!loading && (
          <div className="space-y-6">
            {tasks.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No tasks yet</h3>
                <p className="text-slate-600 mb-6">Get started by creating your first task!</p>
                <Link
                  to="/tasks/new"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Create Your First Task
                </Link>
              </div>
            ) : (
              tasks.map(task => (
                <div
                  key={task.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 transition-all duration-200 hover:shadow-xl hover:scale-[1.01] ${
                    task.status === 'completed'
                      ? 'border-emerald-500 opacity-75'
                      : 'border-indigo-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className={`text-xl font-bold ${
                            task.status === 'completed'
                              ? 'line-through text-slate-500'
                              : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {task.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-slate-600 mb-3">{task.description}</p>
                      )}
                      <div className="text-xs text-slate-400">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleToggleStatus(task.id, task.status)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
                          task.status === 'pending'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                      >
                        {task.status === 'pending' ? '✓ Done' : '↩ Undo'}
                      </button>
                      <Link
                        to={`/tasks/${task.id}/edit`}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium text-sm hover:bg-blue-200 transition-all duration-200 transform hover:scale-105"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium text-sm hover:bg-red-200 transition-all duration-200 transform hover:scale-105"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
