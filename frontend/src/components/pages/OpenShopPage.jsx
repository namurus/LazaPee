import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Upload } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading';
import TextInput from '../atoms/TextInput';
import LargeTextInputField from '../atoms/LargeTextInputField';
import { Button } from '../ui/button';
import Image from '../atoms/Image';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';

function OpenShopPage() {
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(user);
    const formData = new FormData(e.target);
    try {
      const response = await fetch(
        'https://lazapee-jivl.onrender.com/shop/open-shop',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (response.ok) {
        user.role = 'shop'; // Temporary fix to update user role, will be corrected in the future
        navigate('/shop/dashboard');
      } else {
        console.log('Failed to create shop');
      }
    } catch (error) {
      console.log('Error in shop creation:', error);
    } finally {
      setIsLoading(false);
    }
    // Submit shop creation logic here
    // navigate('/shop/dashboard');
  };

  return (
    <div className='container mx-auto flex flex-col items-center px-4 py-8'>
      <SectionHeading title='Open Your Shop' className='mb-8 text-left' />

      <form
        method='post'
        className='max-w-3xl space-y-8'
        onSubmit={handleSubmit}
      >
        <div className='relative h-64 w-full overflow-hidden rounded-2xl bg-[#F2F0F1]'>
          <input
            type='file'
            id='background'
            name='background'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
          {previewImage ? (
            <Image
              src={previewImage}
              alt='Shop background'
              className='h-full w-full object-cover'
            />
          ) : (
            <label
              htmlFor='background'
              className='flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 text-gray-500'
            >
              <Upload size={40} />
              <p className='text-center text-sm'>
                Drop your shop background image here or{' '}
                <span className='text-black'>browse</span>
                <br />
                <span className='text-xs opacity-60'>
                  SVG, PNG, JPG (Recommended: 1440x360px)
                </span>
              </p>
            </label>
          )}
        </div>

        <div className='space-y-6'>
          <div>
            <label className='mb-2 block text-sm font-semibold'>
              Shop Name
            </label>
            <TextInput
              name='shopName'
              placeholder='Enter your shop name'
              required
              className='w-full rounded-lg border px-4 py-2'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-semibold'>
              Shop Description
            </label>
            <LargeTextInputField
              name='description'
              placeholder='Tell customers what your shop is about...'
              maxLength={500}
              required
              className='min-h-[120px] w-full rounded-lg border px-4 py-2'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => navigate(-1)}
            className='rounded-full px-6'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='rounded-full bg-black px-6 text-white hover:bg-black/90'
          >
            {isLoading && <LoadingSpinner />}
            Create Shop
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OpenShopPage;
