import { Link } from 'react-router-dom';

export default function ShippingInfo() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold text-slate-900">Shipping Info</h1>
            <p className="mt-3 text-slate-600">
                How we deliver your TechVault order.
            </p>
            <div className="mt-8 space-y-6">
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">Delivery areas</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        We deliver nationwide across South Africa. Enter your full street address, suburb, city, and postal code at checkout.
                    </p>
                </section>
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">Delivery times</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                        <li>Major cities: typically 2–5 business days after the order is confirmed</li>
                        <li>Other areas: typically 5–10 business days</li>
                    </ul>
                </section>
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">Order status</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        After you place an order it starts as Pending. Our team then Confirms it, marks it Shipped when it leaves the warehouse, and Delivered when it reaches you. Check status anytime under My Orders.
                    </p>
                </section>
            </div>
            <Link to="/" className="mt-8 inline-block text-sm text-brand-600 hover:underline">← Back to home</Link>
        </div>
    );
}
