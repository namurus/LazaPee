import PropTypes from 'prop-types';
import InverseButton from './../atoms/InverseButton';
import ReviewCard from '../molecules/ReviewCard';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { SlidersHorizontal } from 'lucide-react';

function ProductReviewSection({ productID, limit = 4 }) {
  const [reviews, setReviews] = useState([]);
  const [skip, setSkip] = useState(0);
  const [haveMoreReviews] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // productID will be used to fetch reviews for a specific product

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/comments?limit=${limit}&skip=${skip}&id=${productID}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setReviews((r) => [
        ...r,
        ...data.comments
          .filter((d) => {
            if (r.find((review) => review.id === d.id)) {
              return false;
            }
            return true;
          })
          .map((d) => {
            return {
              rating: Math.floor(Math.random() * 5) + 1,
              reviewerEmail: d.user.username + '@gmail.com',
              id: d.id,
              comment: d.body,
              date: new Date(),
            };
          }),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, [limit, skip, productID]);

  const handleLoadMoreReviews = () => {
    setIsLoading(true);
    setSkip((s) => s + limit);
  };
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
        </DialogHeader>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='description' value='Description' />
          </div>
          <Textarea id='description' placeholder='Your review here' required />
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
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <Input id='dropzone-file' className='hidden' type='file' />
          </Label>
        </div>
        <DialogFooter>
          <button className='rounded-full px-4 py-3 font-semibold'>
            Submit Review
          </button>
          <DialogClose asChild>
            <button className='rounded-full px-4 py-3 font-semibold'>
              Cancel
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <h2 className='text-2xl font-semibold'>All Reviews</h2>
          <p>({reviews.length})</p>
        </div>
        <div className='flex gap-2'>
          <div className='w-[2.5rem] rounded-full bg-neutral-200 p-3'>
            <SlidersHorizontal className='aspect-square h-full' />
          </div>
          <DialogTrigger asChild>
            <InverseButton
              style={`rounded-full px-4 py-3 text-[0.75rem] font-normal`}
            >
              Write a review
            </InverseButton>
          </DialogTrigger>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 py-5 md:grid-cols-2 lg:grid-cols-2'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div className='w-full justify-center'>
        {isLoading && <LoadingSpinner />}
      </div>
      <div className='flex items-center'>
        {haveMoreReviews && (
          <button
            className={`mx-auto w-fit rounded-full border px-9 py-[0.875rem] font-normal capitalize`}
            onClick={handleLoadMoreReviews}
          >
            Load More Reviews
          </button>
        )}
      </div>
    </Dialog>
  );
}

ProductReviewSection.propTypes = {
  productID: PropTypes.string.isRequired,
  limit: PropTypes.number,
  reviews: PropTypes.array.isRequired,
};

export default ProductReviewSection;
