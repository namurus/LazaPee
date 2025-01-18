import PropTypes from 'prop-types';
import StarRating from '../atoms/StarRating';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import ValueConverter from '../../helpers/ValueConverter';
import { useState } from 'react';
import TextInput from '../atoms/TextInput';
import RatingInput from '../atoms/RatingInput';

function ReviewCard({ review, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [reviewValue, setReviewValue] = useState(review);
  return (
    <div className='rounded-[1.25rem] border-2 p-6 lg:px-8 lg:py-7'>
      <div className='mb-3 flex items-center'>
        {isEditing ? (
          <RatingInput
            defaultValue={reviewValue.rating}
            onChange={(value) =>
              setReviewValue({ ...reviewValue, rating: value })
            }
            name='rating'
          />
        ) : (
          <StarRating
            rating={review.rating}
            name={review.reviewerEmail + review.id}
          />
        )}
        {review.isUserReview && (
          <div className='ml-auto flex items-center gap-2'>
            <Button
              variant={'primary'}
              className='h-min p-1'
              onClick={() => {
                setIsEditing(!isEditing);
                setReviewValue(review);
              }}
            >
              <Edit className='h-4 w-4' />
            </Button>

            <Button
              variant={'destructive'}
              className='h-min p-1'
              onClick={() => onDelete(review)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
      <h3 className='mb-2 text-base font-semibold'>
        {review.reviewerName}{' '}
        {review.isUserReview && (
          <span className='text-sm font-light text-neutral-600'>(Bạn)</span>
        )}
      </h3>
      {review.isUserReview && isEditing ? (
        <TextInput
          placeholder='Nhập đánh giá của bạn'
          value={reviewValue.comment}
          onChange={(e) =>
            setReviewValue({
              ...reviewValue,
              comment: e.target.value,
            })
          }
        />
      ) : (
        <p className='text-balance text-sm font-light opacity-60'>
          &quot;
          {review.comment}
          &quot;
        </p>
      )}
      <div className='mt-4 flex items-center gap-4 lg:mt-6'>
        {review.date && (
          <p className='text-sm font-light text-neutral-600'>
            Đăng vào ngày{' '}
            {ValueConverter.formatDateTime(review.date, {
              dateOnly: true,
            })}
          </p>
        )}
        {isEditing && (
          <Button
            variant={'outline'}
            onClick={() => {
              setIsEditing(false);
              onEdit(reviewValue);
            }}
          >
            Hoàn thiện sửa
          </Button>
        )}
      </div>
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
