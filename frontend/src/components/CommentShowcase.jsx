import { useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

function CommentCard({ comment }) {
  return (
    <div className='rounded-[1.25rem] border-2 p-6 lg:px-8 lg:py-7'>
      <div className='mb-3'>
        <StarRating rating={5} name={comment.user.username + comment.id} />
      </div>
      <h3 className='mb-2 text-base font-semibold'>{comment.user.fullName}</h3>
      <p className='text-balance text-sm font-light opacity-60'>
        &quot;
        {comment.body}
        &quot;
      </p>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
};

function CommentShowcase() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);

  useEffect(() => {
    fetch('https://dummyjson.com/comments?limit=10')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 640);
  };
  const handleNextComment = () => {
    setCurrentCommentIndex((prev) =>
      prev + 1 === comments.length ? prev : prev + 1
    );
  };

  const handlePrevComment = () => {
    setCurrentCommentIndex((prev) => (prev - 1 < 0 ? prev : prev - 1));
  };

  const getDesktopComments = () => {
    if (comments.length === 0) return [];
    if (comments.length < 3) return comments;
    if (currentCommentIndex >= comments.length - 2) return comments.slice(-3);
    return comments.slice(currentCommentIndex, currentCommentIndex + 3);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className='m-20 mb-0'>
      <div className='lg:container lg:mx-auto'>
        <div className='flex gap-2'>
          <SectionHeading
            title='OUR HAPPY CUSTOMERS'
            className={'my-6 flex-1 text-left'}
          />
          <div className='flex items-center gap-4 [&>*]:h-6 [&>*]:w-6'>
            <button
              onClick={() => handlePrevComment()}
              disabled={currentCommentIndex === 0}
              className='disabled:opacity-50'
            >
              <FaArrowLeft className='w-full' />
            </button>
            <button
              onClick={() => handleNextComment()}
              disabled={
                isMobileView
                  ? currentCommentIndex === comments.length - 1
                  : currentCommentIndex >= comments.length - 3
              }
              className='disabled:opacity-50'
            >
              <FaArrowRight className='w-full' />
            </button>
          </div>
        </div>
        {isMobileView ? (
          <div className='mobile-view sm:hidden'>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-1'>
              {comments[currentCommentIndex] && (
                <CommentCard comment={comments[currentCommentIndex]} />
              )}
            </div>
          </div>
        ) : (
          <div className='desktop-view hidden sm:block'>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-1'>
              {getDesktopComments().map((comment) => (
                <div key={comment.user.username + comment.id}>
                  <CommentCard comment={comment} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CommentShowcase;
