import { useState, useEffect, useCallback } from 'react';
import SectionHeading from '../atoms/SectionHeading';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import LoadingSpinner from '../atoms/LoadingSpinner';
import ReviewCard from '../molecules/ReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

function CommentShowcase() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('https://dummyjson.com/comments?limit=10')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  });

  const handleNextComment = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handlePrevComment = useCallback(() => {
    api?.scrollPrev();
  }, [api]);
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
              disabled={current === 1}
              className='disabled:opacity-50'
            >
              <FaArrowLeft className='w-full' />
            </button>
            <button
              id='right'
              onClick={() => handleNextComment()}
              disabled={current === count}
              className='disabled:opacity-50'
            >
              <FaArrowRight className='w-full' />
            </button>
          </div>
        </div>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {comments.map((comment, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                <ReviewCard
                  review={{
                    reviewerName: comment.user.fullName,
                    rating: 5,
                    comment: comment.body,
                    reviewerEmail: comment.user.username,
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default CommentShowcase;
