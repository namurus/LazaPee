import PropTypes from 'prop-types';
import InverseButton from './../atoms/InverseButton';
import ReviewCard from '../molecules/ReviewCard';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../atoms/LoadingSpinner';
import ReviewDialog from '../molecules/ReviewDialog';
import {
  createReview,
  deleteReview,
  editReview,
  getProductReviews,
} from '../../api/admin/product';
import { toast } from 'sonner';
import { parseJSON } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';

function ProductReviewSection({ productID, limit = 4 }) {
  const [reviews, setReviews] = useState([]);
  const [AJAXInfo, setAJAXInfo] = useState({
    page: 1,
    perPage: limit,
    totalPage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const { user } = useAuth();

  // productID will be used to fetch reviews for a specific product
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getProductReviews(productID, {
        page: AJAXInfo.page,
        perPage: AJAXInfo.perPage,
      });
      if (response.code === 200) {
        setReviews((r) => [
          ...r,
          ...response.data
            .filter((d) => {
              const existingReview = r.find((review) => review.id === d.id);
              return !existingReview;
            })
            .map((d) => {
              return {
                rating: d.rating,
                reviewerEmail: d.user.email,
                reviewerName: d.user.fullName,
                id: d.id,
                comment: d.content,
                date: parseJSON(d.createdAt),
                isUserReview: user.id === d.user.id,
              };
            }),
        ]);
      } else {
        toast.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.log('Error in fetching reviews:', error);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-right',
        className: 'bg-red-500 text-white',
        closeButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMoreReviews = () => {
    setIsLoading(true);
    setAJAXInfo({
      ...AJAXInfo,
      page: AJAXInfo.page + 1,
    });
  };

  const handleSubmitReview = async (review) => {
    try {
      const response = await createReview(productID, {
        rating: review.rating,
        content: review.content,
      });
      if (response.code === 200) {
        toast.success('Đánh giá của bạn đã được gửi', {
          position: 'top-right',
          className: 'bg-green-500 text-white',
          closeButton: true,
        });
        fetchData();
      } else {
        toast.error('Đánh giá không thành công', {
          position: 'top-right',
          className: 'bg-red-500 text-white',
          closeButton: true,
        });
      }
    } catch (error) {
      console.log('Error in submitting review:', error);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-right',
        className: 'bg-red-500 text-white',
        closeButton: true,
      });
    } finally {
      setOpenReviewDialog(false);
    }
  };

  const handleDeleteReview = async (review) => {
    try {
      // Call delete review API
      // If successful, remove the review from the state
      // If failed, show an error toast
      const response = await deleteReview(review.id);
      if (response.code === 200) {
        toast.success('Đánh giá của bạn đã được xoá thành công', {
          position: 'top-right',
          className: 'bg-green-500 text-white',
          closeButton: true,
        });
        setReviews((r) => r.filter((rev) => rev.id !== review.id));
      } else {
        toast.error('Xoá đánh giá không thành công', {
          position: 'top-right',
          className: 'bg-red-500 text-white',
          closeButton: true,
        });
      }
    } catch (error) {
      console.log('Error in deleting review:', error);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-right',
        className: 'bg-red-500 text-white',
        closeButton: true,
      });
    }
  };

  const handleEditReview = async (review) => {
    // Show a dialog with the review content
    // Allow user to edit the review
    // Call the update review API
    // If successful, update the review in the state
    // If failed, show an error toast
    try {
      // Call delete review API
      // If successful, remove the review from the state
      // If failed, show an error toast
      const response = await editReview(review.id, {
        rating: review.rating,
        content: review.comment,
      });
      if (response.code === 200) {
        toast.success('Đánh giá của bạn đã được chỉnh sửa thành công', {
          position: 'top-right',
          className: 'bg-green-500 text-white',
          closeButton: true,
        });
        setReviews((r) =>
          r.map((rev) =>
            rev.id === review.id
              ? {
                  ...rev,
                  rating: review.rating,
                  comment: review.comment,
                }
              : rev
          )
        );
      } else {
        toast.error('Chỉnh sửa đánh giá không thành công', {
          position: 'top-right',
          className: 'bg-red-500 text-white',
          closeButton: true,
        });
      }
    } catch (error) {
      console.log('Error in deleting review:', error);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-right',
        className: 'bg-red-500 text-white',
        closeButton: true,
      });
    }
  };

  return (
    <div>
      {openReviewDialog && (
        <ReviewDialog
          open={openReviewDialog}
          setOpen={setOpenReviewDialog}
          onSubmit={handleSubmitReview}
        />
      )}
      <div className='flex justify-between'>
        <div className='flex items-center gap-1'>
          <h2 className='text-2xl font-semibold'>Tất cả đánh giá</h2>
          <p>({reviews.length})</p>
        </div>
        <div className='flex gap-2'>
          <InverseButton
            style={`rounded-full px-4 py-3 text-[0.75rem] font-normal`}
            onClick={() => setOpenReviewDialog(true)}
          >
            Viết đánh giá
          </InverseButton>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 py-5 md:grid-cols-2 lg:grid-cols-2'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={handleDeleteReview}
              onEdit={handleEditReview}
            />
          ))
        ) : (
          <p>Hiện không có đánh giá cho sản phẩm này</p>
        )}
      </div>
      <div className='w-full justify-center'>
        {isLoading && <LoadingSpinner />}
      </div>
      <div className='flex items-center'>
        {AJAXInfo.page < AJAXInfo.totalPage && (
          <button
            className={`mx-auto w-fit rounded-full border px-9 py-[0.875rem] font-normal capitalize`}
            onClick={handleLoadMoreReviews}
          >
            Xem thêm đánh giá
          </button>
        )}
      </div>
    </div>
  );
}

ProductReviewSection.propTypes = {
  productID: PropTypes.string.isRequired,
  limit: PropTypes.number,
  reviews: PropTypes.array.isRequired,
};

export default ProductReviewSection;
