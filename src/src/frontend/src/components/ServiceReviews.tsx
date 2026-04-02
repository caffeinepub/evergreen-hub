import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ServiceReviewsProps {
  storageKey: string;
  defaultReviews: Review[];
}

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

export default function ServiceReviews({
  storageKey,
  defaultReviews,
}: ServiceReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setReviews(JSON.parse(stored) as Review[]);
      } else {
        setReviews(defaultReviews);
      }
    } catch {
      setReviews(defaultReviews);
    }
  }, [storageKey, defaultReviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const newReview: Review = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      /* ignore */
    }
    setName("");
    setComment("");
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h3 className="text-2xl font-extrabold text-center text-gray-900 mb-8">
        Customer{" "}
        <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
          Reviews
        </span>
      </h3>

      {/* Existing Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {reviews.map((r, i) => (
          <div
            key={`${r.name}-${i}`}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex gap-1 mb-2">
              {STAR_POSITIONS.map((pos) => (
                <Star
                  key={pos}
                  className={`w-4 h-4 ${
                    pos <= r.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              "{r.comment}"
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
              </div>
              <p className="text-xs text-gray-400">{r.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
        <h4 className="font-extrabold text-gray-900 mb-4">Write a Review</h4>
        {submitted && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm font-semibold">
            ✅ Review submitted! Thank you for your feedback.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            data-ocid="review.input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {/* Star Rating Picker */}
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600 mr-2">Rating:</span>
            {STAR_POSITIONS.map((pos) => (
              <button
                key={pos}
                type="button"
                onMouseEnter={() => setHoveredStar(pos)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(pos)}
                className="transition-transform hover:scale-125"
              >
                <Star
                  className={`w-6 h-6 ${
                    pos <= (hoveredStar || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            data-ocid="review.textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            required
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          />
          <button
            type="submit"
            data-ocid="review.submit_button"
            className="bg-gradient-to-r from-primary to-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
