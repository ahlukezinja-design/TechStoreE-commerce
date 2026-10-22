import { Link } from 'react-router-dom';

export default function Returns() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold text-slate-900">Returns</h1>
            <p className="mt-3 text-slate-600">
                Our return policy for TechVault purchases.
            </p>
            <div className="mt-8 space-y-6">
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">Return window</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        You may request a return within 7 days of delivery if the item is unused, in original packaging, and in the same condition you received it.
                    </p>
                </section>
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">How to return</h2>
                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
                        <li>Contact us with your order number and reason for return.</li>
                        <li>Wait for confirmation and return instructions.</li>
                        <li>Ship the item back securely. Second-hand items must match the listed condition.</li>
                    </ol>
                </section>
                <section className="card p-6">
                    <h2 className="font-semibold text-slate-900">Refunds</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Once we receive and inspect the item, approved refunds are processed using the same payment method where possible. Faulty or misdescribed items are covered under this policy.
                    </p>
                </section>
            </div>
            <Link to="/contact" className="mt-8 inline-block text-sm text-brand-600 hover:underline">Contact us →</Link>
        </div>
    );
}
