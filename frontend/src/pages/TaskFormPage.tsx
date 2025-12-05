// Task form page: used for both creating and editing tasks with RHF + Zod.
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  mode: 'create' | 'edit';
};

const TaskFormPage = ({ mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'pending' },
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (mode === 'edit' && id) {
        try {
          setLoading(true);
          const res = await api.get('/tasks');
          const task = res.data.find((t: any) => t.id === Number(id));
          if (!task) {
            alert('Task not found');
            navigate('/tasks');
            return;
          }
          reset({
            title: task.title,
            description: task.description ?? '',
            status: task.status,
          });
        } catch {
          alert('Failed to load task');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTask();
  }, [id, mode, navigate, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (mode === 'create') {
        await api.post('/tasks', values);
      } else if (mode === 'edit' && id) {
        await api.put(`/tasks/${id}`, values);
      }
      navigate('/tasks');
    } catch (err: any) {
      const message = err.response?.data?.error ?? 'Failed to save task';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
              <span className="text-3xl">{mode === 'create' ? '➕' : '✏️'}</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {mode === 'create' ? 'Create New Task' : 'Edit Task'}
            </h1>
            <p className="text-slate-600 mt-2">
              {mode === 'create'
                ? 'Fill in the details to create a new task'
                : 'Update your task details'}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
              <p className="text-slate-600">Loading task...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    errors.title
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                  } focus:outline-none focus:ring-4`}
                  placeholder="Enter task title"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 resize-none ${
                    errors.description
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                  } focus:outline-none focus:ring-4`}
                  rows={4}
                  placeholder="Add a description (optional)"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Status
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    errors.status
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                  } focus:outline-none focus:ring-4`}
                  {...register('status')}
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="completed">✓ Completed</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span> Saving...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>💾</span> Save Task
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/tasks')}
                  className="flex-1 bg-white border-2 border-slate-300 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transform hover:scale-[1.02] transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFormPage;
