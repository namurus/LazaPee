import { useState } from 'react';
import { Form } from 'react-router-dom';
import InputField from '../molecules/InputField';
import CategorySelector from '../molecules/CategorySelector';
import ImageUploader from '../atoms/ImageUploader';
import ImagePreviewGrid from '../molecules/ImagePreviewGrid';
import Button from '../atoms/Button';
import { Save } from 'lucide-react';
import LargeTextInputField from '../atoms/LargeTextInputField';
import SectionHeading from '../atoms/SectionHeading';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import ColorPicker from '../molecules/ColorPicker';
import SizeList from '../molecules/SizeList';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import ShopTitleSection from '../molecules/ShopTitleSection';
import TextInput from '../atoms/TextInput';
import ImageInput from '../molecules/ImageInput';
import CategoryAdderInput from './CategoryAdderInput';

const config = {
  priceRange: {
    min: 0,
    max: 50000,
    priceGap: 100,
  },
  colors: [
    '#38BE40',
    '#EF0000',
    '#F5D936',
    '#F17516',
    '#2ECCF3',
    '#004EF0',
    '#7435EF',
    '#EE1B9F',
    '#FFFFFF',
    '#000000',
  ],
  sizes: [
    'XX-Small',
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    'XX-Large',
  ],
};

function AddProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    id: '',
    name: '',
  });
  const [pickedColor, setPickedColor] = useState(null);
  const [pickedSize, setPickedSize] = useState(null);
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handlePickColor = (color) => {
    if (pickedColor === color) {
      setPickedColor(null);
      return;
    }
    setPickedColor(color);
  };

  const handlePickSize = (size) => {
    if (pickedSize === size) {
      setPickedSize(null);
      return;
    }
    setPickedSize(size);
  };

  return (
    <SidebarMaincontentLayout>
      <Form className='w-full space-y-8 p-6 font-primary'>
        <ShopTitleSection title={'Thông tin cơ bản'}>
          <InputField
            title={'Tên sản phẩm'}
            helperText={
              'Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật'
            }
          >
            <TextInput
              name='name'
              placeholder='Nhập tên sản phẩm'
              className={'max-w-[45ch]'}
            />
          </InputField>
          <InputField title={'Mô tả sản phẩm'} className={'max-w-[45ch]'}>
            <LargeTextInputField maxLength={500} />
          </InputField>
          <InputField title={'Chọn ngành hàng'}>
            <TextInput
              name='name'
              placeholder='Nhập ngành hàng cho sản phẩm'
              className={'max-w-[45ch]'}
            />
          </InputField>
          <InputField
            title={'Thêm hình ảnh sản phẩm'}
            helperText={'Tối đa 9 hình ảnh'}
          >
            <ImageInput maxImages={9} />
          </InputField>
        </ShopTitleSection>
        <ShopTitleSection title={'Thông tin bán hàng'}>
          <InputField title={'Phân loại sản phẩm'}>
            <CategoryAdderInput />
          </InputField>
        </ShopTitleSection>
      </Form>
    </SidebarMaincontentLayout>
  );
}

export default AddProductForm;
