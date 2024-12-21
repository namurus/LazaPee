import { HiAdjustments } from 'react-icons/hi';
import PropTypes from 'prop-types';
import InverseButton from './../atoms/InverseButton';
import ReviewCard from '../molecules/ReviewCard';
import Button from '../atoms/Button';
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'LOAD_MORE_REVIEWS') {
    return {
      ...state,
      numReviewsShown: state.numReviewsShown + 3,
    };
  }
}

function ProductReviewSection({ reviews }) {
  const mockReviews = [
    {
      rating: 5,
      reviewerName: 'John Doe',
      reviewerEmail: 'sdw@gmail.com',
      comment: 'This is a great product. I love it!',
      date: new Date(),
    },
    {
      rating: 4,
      reviewerName: 'Jane Doe',
      reviewerEmail: 'janedoe@mail.com',
      comment: 'This is a great product. I love it!',
      date: new Date(),
    },
    {
      rating: 3,
      reviewerName: 'John Doe',
      reviewerEmail: 'doe@mail.com',
      comment: 'This is a great product. I love it!',
      date: new Date(),
    },
  ];
  const [state, dispatch] = useReducer(reducer, {
    numReviewsShown: 4,
  });
  reviews = reviews.concat(mockReviews);
  const showReviews = reviews
    .concat(mockReviews)
    .slice(0, state.numReviewsShown);
  const handleLoadMoreReviews = () => {
    dispatch({ type: 'LOAD_MORE_REVIEWS' });
  };
  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <h2 className='text-2xl font-semibold'>All Reviews</h2>
          <p>({reviews.length})</p>
        </div>
        <div className='flex gap-2'>
          <div className='w-[2.5rem] rounded-full bg-neutral-200 p-3'>
            <HiAdjustments className='aspect-square h-full' />
          </div>
          <InverseButton
            style={`rounded-full px-4 py-3 text-[0.75rem] font-normal`}
          >
            Write a review
          </InverseButton>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 py-5 md:grid-cols-2'>
        {showReviews.map((review) => (
          <ReviewCard key={review.reviewerEmail} review={review} />
        ))}
      </div>
      <div className='flex items-center'>
        {state.numReviewsShown < reviews.length && (
          <Button
            style={`rounded-full w-fit px-9 py-[0.875rem] capitalize border font-normal mx-auto`}
            onClick={handleLoadMoreReviews}
          >
            Load More Reviews
          </Button>
        )}
      </div>
    </div>
  );
}

ProductReviewSection.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default ProductReviewSection;
