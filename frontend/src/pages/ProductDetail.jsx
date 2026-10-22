import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getRatings, createRating } from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

function formatPrice(price) {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(Number(price));
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);
    const { addToCart } = useCart();

    const [ratings, setRatings] = useState([]);
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState('');
    const [ratingMsg, setRatingMsg] = useState('');
    const [ratingLoading, setRatingLoading] = useState(false);

    const loadRatings = () => {
        getRatings()
            .then((data) => setRatings(Array.isArray(data) ? data : []))
            .catch(() => setRatings([]));
    };

    useEffect(() => {
        setLoading(true);
        getProduct(id)
            .then(setProduct)
            .catch(() => setProduct(null))
            .finally(() => setLoading(false));
        loadRatings();
    }, [id]);

    const handleSubmitRating = async (e) => {
        e.preventDefault();
        setRatingLoading(true);
        setRatingMsg('');
        try {
            // LocalDateTime-friendly string (no timezone Z)
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const ratingDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

            await createRating({
                score: Number(score),
                comment: comment.trim() || 'Great product!',
                ratingDate,
            });
            setComment('');
            setScore(5);
            setRatingMsg('Thank you for your rating!');
            loadRatings();
        } catch {
            setRatingMsg('Could not save your rating. Please try again.');
        } finally {
            setRatingLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!product) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                <p className="text-slate-500">Product not found.</p>
                <Link to="/products" className="btn-primary mt-4 inline-flex">Back to shop</Link>
            </div>
        );
    }

    const inStock = product.stockQuantity > 0;
    const recentRatings = ratings.slice().reverse().slice(0, 10);

    const handleAdd = () => {
        if (!inStock) return;
        addToCart(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">
            <nav className="mb-6 text-sm text-slate-500">
                <Link to="/" className="hover:text-brand-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:text-brand-600">Shop</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-800">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-2">
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-slate-100 shadow-card">
                    {product.imageUrl && !imgFailed ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            onError={() => setImgFailed(true)}
                            className="h-full w-full object-contain p-6"
                        />
                    ) : (
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-3xl bg-brand-100">
                                <svg className="h-16 w-16 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-brand-600">{product.category}</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{product.brand}</p>
                    <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{product.name}</h1>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                        {product.description || 'Premium quality from TechVault.'}
                    </p>

                    <div className="mt-6 flex items-baseline gap-3">
                        <span className="font-display text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
                        {inStock ? (
                            <span className="badge bg-emerald-100 text-emerald-700">{product.stockQuantity} available</span>
                        ) : (
                            <span className="badge bg-red-100 text-red-700">Out of stock</span>
                        )}
                    </div>

                    {inStock && (
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg font-medium text-slate-600 hover:text-brand-600">−</button>
                                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                                <button type="button" onClick={() => setQty((q) => Math.min(product.stockQuantity, q + 1))} className="px-3 py-2 text-lg font-medium text-slate-600 hover:text-brand-600">+</button>
                            </div>
                            <button type="button" onClick={handleAdd} className={`btn-primary flex-1 sm:flex-none !px-8 ${added ? '!bg-emerald-600' : ''}`}>
                                {added ? 'Added to cart ✓' : 'Add to cart'}
                            </button>
                        </div>
                    )}

                    <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                        {[
                            { label: 'Brand', value: product.brand },
                            { label: 'Category', value: product.category },
                            { label: 'Condition', value: product.itemCondition || 'New' },
                            { label: 'Stock', value: inStock ? `${product.stockQuantity} units` : 'Unavailable' },
                        ].map((row) => (
                            <div key={row.label}>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{row.label}</p>
                                <p className="mt-0.5 text-sm font-semibold text-slate-800">{row.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ratings section — scroll down on any product page */}
            <section className="mt-14 border-t border-slate-200 pt-10">
                <h2 className="font-display text-xl font-bold text-slate-900">Customer ratings</h2>

                <form onSubmit={handleSubmitRating} className="mt-6 card max-w-xl space-y-4 p-6">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Your score</label>
                        <select value={score} onChange={(e) => setScore(e.target.value)} className="input-field mt-1">
                            {[5, 4, 3, 2, 1].map((n) => (
                                <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            placeholder="Share your experience with this product…"
                            className="input-field mt-1"
                        />
                    </div>
                    {ratingMsg && (
                        <p className={`text-sm ${ratingMsg.includes('Thank') ? 'text-emerald-600' : 'text-red-600'}`}>
                            {ratingMsg}
                        </p>
                    )}
                    <button type="submit" disabled={ratingLoading} className="btn-primary">
                        {ratingLoading ? 'Sending…' : 'Submit rating'}
                    </button>
                </form>

                <ul className="mt-8 space-y-3">
                    {recentRatings.length === 0 && (
                        <li className="text-sm text-slate-400">No ratings yet. Be the first to review!</li>
                    )}
                    {recentRatings.map((r) => (
                        <li key={r.id} className="card flex items-start gap-3 p-4">
                            <span className="rounded-lg bg-brand-50 px-2 py-1 text-sm font-bold text-brand-700">
                                {r.score}/5
                            </span>
                            <div>
                                <p className="text-sm text-slate-700">{r.comment || 'No comment'}</p>
                                <p className="mt-1 text-xs text-slate-400">
                                    {r.ratingDate ? new Date(r.ratingDate).toLocaleString('en-ZA') : ''}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
