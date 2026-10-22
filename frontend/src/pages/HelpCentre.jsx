import { Link } from 'react-router-dom';

export default function HelpCentre() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold text-slate-900">Help Centre</h1>
            <p className="mt-3 text-slate-600">
                Find quick answers about shopping with TechVault.
            </p>
            <div className="mt-8 space-y-6">
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">How do I place an order?</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Browse the Shop, add items to your cart, then go to Checkout. Enter your details and shipping address, choose a payment method, and place the order.
                    </p>
                </section>
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">How do I track my order?</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Open <Link to="/orders" className="text-brand-600 hover:underline">My Orders</Link> and sign in with the email you used at checkout. You will see the status of each order (Pending, Confirmed, Shipped, or Delivered).
                    </p>
                </section>
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">Can I cancel an order?</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Yes, if the order is still Pending or Confirmed. Open My Orders and use Cancel order. Once an order is Shipped, contact us for assistance.
                    </p>
                </section>
            </div>
            <Link to="/" className="mt-8 inline-block text-sm text-brand-600 hover:underline">← Back to home</Link>
        </div>
    );
}
