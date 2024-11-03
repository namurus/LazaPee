import PropTypes from 'prop-types';
import StarRating from '../atoms/StarRating';
import { format } from 'date-fns';

function ReviewCard({ review }) {
  return (
    <div className='rounded-[1.25rem] border-2 p-6 lg:px-8 lg:py-7'>
      <div className='mb-3'>
        <StarRating
          rating={review.rating}
          name={review.reviewerEmail + review.id}
        />
      </div>
      <h3 className='mb-2 text-base font-semibold'>{review.reviewerName}</h3>
      <p className='text-balance text-sm font-light opacity-60'>
        &quot;
        {review.comment}
        &quot;
      </p>
      {review.date && (
        <p className='mt-4 text-sm font-light text-neutral-600 lg:mt-6'>
          Posted on {format(review.date, 'MMMM dd, yyyy')}
        </p>
      )}
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
