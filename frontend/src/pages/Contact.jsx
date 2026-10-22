import { Link } from 'react-router-dom';

export default function Contact() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold text-slate-900">Contact Us</h1>
            <p className="mt-3 text-slate-600">
                We are happy to help with orders, products, and returns.
            </p>
            <div className="mt-8 card space-y-4 p-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
                    <p className="mt-1 text-slate-800">support@techvault.co.za</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</p>
                    <p className="mt-1 text-slate-800">+27 01 576 0849</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Hours</p>
                    <p className="mt-1 text-slate-800">Monday – Friday, 09:00 – 17:00 (SAST)</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Address</p>
                    <p className="mt-1 text-slate-800">Cape Town, South Africa</p>
                </div>
            </div>
            <p className="mt-6 text-sm text-slate-500">
                Please include your order number when you contact us about an existing order.
            </p>
            <Link to="/" className="mt-8 inline-block text-sm text-brand-600 hover:underline">← Back to home</Link>
        </div>
    );
}
