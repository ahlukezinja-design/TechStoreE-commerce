import { useState } from 'react';
import { createRating } from '../services/api';

export default function RatingForm({ onRatingAdded }) {
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            const ratingData = {
                score: Number(score),
                comment,
                ratingDate: new Date().toISOString(), // Matches LocalDateTime format
            };

            const savedRating = await createRating(ratingData);
            setSuccessMsg('Thank you for your rating!');
            setComment('');
            if (onRatingAdded) onRatingAdded(savedRating);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit rating.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-6 max-w-lg mx-auto">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Leave a Rating</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">Score (1 - 5 Stars)</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setScore(star)}
                                className={`h-10 w-10 rounded-lg font-bold text-lg transition ${
                                    score >= star
                                        ? 'bg-amber-400 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">Comment</label>
                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        rows={3}
                        className="input-field"
                        placeholder="Write your review or feedback here..."
                    />
                </div>

                {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
                {successMsg && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{successMsg}</p>}

                <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
                    {loading ? 'Submitting...' : 'Submit Rating'}
                </button>
            </form>
        </div>
    );
}