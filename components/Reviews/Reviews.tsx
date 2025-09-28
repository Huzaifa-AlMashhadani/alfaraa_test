import { FaStar, FaRegStar } from "react-icons/fa";
import "./Reviews.css"; // ملف CSS خارجي

function Reviews({ reviews }) {
    return (
        <div className="reviews-container">
            {reviews.map((review) => (
                <div key={review.id} className="review-card">
                    {/* النجوم */}
                    <div className="stars">
                        {Array.from({ length: 5 }, (_, i) =>
                            i < review.stars ? (
                                <FaStar key={i} className="star filled" />
                            ) : (
                                <FaRegStar key={i} className="star empty" />
                            )
                        )}
                    </div>

                    {/* المستخدم */}
                    <div className="review-user">
                        بواسطة المستخدم #{review.user_id} - {new Date(review.created_at).toLocaleDateString()}
                    </div>

                    {/* التعليق */}
                    <p className="review-comment">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default Reviews;
