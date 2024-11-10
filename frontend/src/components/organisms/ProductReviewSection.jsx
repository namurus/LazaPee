import { HiAdjustments } from 'react-icons/hi';
import PropTypes from 'prop-types';
import InverseButton from './../atoms/InverseButton';
import ReviewCard from '../molecules/ReviewCard';
import Button from '../atoms/Button';
import { useReducer, useState } from 'react';
import { FileInput, Label, Modal, Textarea } from 'flowbite-react';

function reducer(state, action) {
  if (action.type === 'LOAD_MORE_REVIEWS') {
    return {
      ...state,
      numReviewsShown: state.numReviewsShown + 3,
    };
  }
}

function ProductReviewSection({ reviews }) {
  const [openWriteReviewModal, setOpenWriteReviewModal] = useState(false);
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
      <Modal
        show={openWriteReviewModal}
        onClose={() => setOpenWriteReviewModal(false)}
      >
        <Modal.Header>Write a review</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='description' value='Description' />
              </div>
              <Textarea
                id='description'
                placeholder='Your review here'
                required
              />
            </div>
            <div className='flex w-full items-center justify-center'>
              <Label
                htmlFor='dropzone-file'
                className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
              >
                <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                  <svg
                    className='mb-4 h-8 w-8 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 16'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                    />
                  </svg>
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <FileInput
                  id='dropzone-file'
                  className='hidden'
                  multiple
                  accept=''
                />
              </Label>
            </div>
            <div>
              <InverseButton style={`rounded-full px-4 py-3 font-semibold`}>
                Submit Review
              </InverseButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
            onClick={() => setOpenWriteReviewModal(true)}
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
