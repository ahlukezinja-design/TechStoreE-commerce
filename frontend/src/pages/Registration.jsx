import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createRegistration } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Registration() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic front-end password confirmation check
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            // Mapped to Registration.java fields (email, password, registrationDate)
            const registrationData = {
                email: form.email.trim(),
                password: form.password,
                registrationDate: new Date().toISOString(), // LocalDateTime compatible
            };

            const registration = await createRegistration(registrationData);

            // Log user in and navigate to home page
            if (login) login(registration);
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.error || err.response?.data?.message || 'Registration failed';
            setError(typeof msg === 'string' ? msg : 'Registration failed. Email may already be registered.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 animate-fade-in">
            <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-glow">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </div>
                <h1 className="font-display text-2xl font-bold text-slate-900">
                    Create your account
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Join us today to get started
                </p>
            </div>

            <div className="card p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="input-field"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="••••••••"
                        />
                    </div>

                    <p className="text-xs text-slate-400">
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full !py-3"
                    >
                        {loading ? 'Registering...' : 'Create account'}
                    </button>
                </form>

                <div className="mt-6 border-t border-slate-100 pt-4 text-center">
                    <p className="text-xs text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
                <Link to="/" className="font-medium text-brand-600 hover:text-brand-700">
                    ← Back to home
                </Link>
            </p>
        </div>
    );
}