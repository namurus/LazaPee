import { toast } from 'sonner';
import LargeTextInputField from '../atoms/LargeTextInputField';
import RatingInput from '../atoms/RatingInput';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';
import InputField from './InputField';
import ResponsiveDialog from './ResonsiveDialog';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { useState } from 'react';

function ReviewDialog({ open, setOpen, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rating = formData.get('rating');
    const content = formData.get('content');

    if (!rating || !content) {
      toast.error('Vui lòng nhập đầy đủ thông tin', {
        position: 'top-right',
        className: 'bg-red-500 text-white',
        closeButton: true,
      });
      return;
    }
    setIsLoading(true);
    onSubmit({ rating, content });
  };
  return (
    <ResponsiveDialog
      isOpen={open}
      setIsOpen={setOpen}
      title='Viết đánh giá'
      description={'Viết đánh giá của bạn về sản phẩm'}
    >
      <form onSubmit={handleSubmit}>
        <InputField title={'Đánh giá'}>
          <RatingInput name='rating' />
        </InputField>
        <InputField title={'Nội dung'}>
          <LargeTextInputField
            placeholder='Nhập đánh giá của bạn'
            name='content'
            maxLength={500}
          />
        </InputField>
        <DialogFooter>
          <Button type='submit'>
            {isLoading && <LoadingSpinner className='h-4 w-4' />} Gửi đánh giá
          </Button>
        </DialogFooter>
      </form>
    </ResponsiveDialog>
  );
}

export default ReviewDialog;
