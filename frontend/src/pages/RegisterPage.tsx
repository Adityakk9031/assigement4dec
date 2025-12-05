// Register page: creates a new user and logs them in on success.
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../store/store';
import { setCredentials } from '../store/authSlice';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await api.post('/auth/register', values);
      dispatch(setCredentials(res.data));
      navigate('/tasks', { replace: true });
    } catch (err: any) {
      const message = err.response?.data?.error ?? 'Registration failed';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
              <span className="text-3xl">✨</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get Started
            </h1>
            <p className="text-slate-600">Create your account to start managing tasks</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  errors.username
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-purple-200'
                } focus:outline-none focus:ring-4`}
                placeholder="Choose a username"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-purple-200'
                } focus:outline-none focus:ring-4`}
                placeholder="Create a password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-purple-600 hover:text-pink-600 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
