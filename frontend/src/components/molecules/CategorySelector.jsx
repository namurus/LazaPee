import { SelectValue } from '@radix-ui/react-select';
import PropTypes from 'prop-types';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import ColorBadge from './ColorBadge';
import { useState } from 'react';
import SizeBadge from './SizeBadge';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import ColorPicker from './ColorPicker';
import { cn } from '../../lib/utils';
import SizeList from './SizeList';

function CategorySelector({ onCategorySelect, notAllowedOptions }) {
  const [items, setItems] = useState([]);
  const [isColor, setIsColor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelect = (value) => {
    if (value === 'color') {
      onCategorySelect({ type: 'Màu sắc' });
      setIsColor(true);
    } else {
      onCategorySelect({ type: 'Kích thước' });
      setIsColor(false);
    }
    setItems([]);
    setSelectedItem(null);
  };
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    onCategorySelect({ items: items.filter((_, i) => i !== index) });
  };

  const handlePickItem = (item) => {
    if (item === selectedItem) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
  };

  const handleAdd = () => {
    if (!selectedItem) return;
    const existingItem = items.find((item) => item.text === selectedItem.text);
    if (existingItem) {
      setSelectedItem(null);
      return;
    }
    setItems([...items, selectedItem]);
    onCategorySelect({ items: [...items, selectedItem] });
    setSelectedItem(null);
  };
  return (
    <Dialog>
      <div className='space-y-4 rounded-md bg-zinc-400 p-4'>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className='max-w-[25ch]'>
            <SelectValue placeholder='Chọn 1 phân loại' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value='size'
              disabled={notAllowedOptions.includes('size')}
            >
              Kích thước
            </SelectItem>
            <SelectItem
              value='color'
              disabled={notAllowedOptions.includes('color')}
            >
              Màu sắc
            </SelectItem>
          </SelectContent>
        </Select>
        <div className='flex min-h-16 flex-wrap items-center gap-4 rounded-md border border-zinc-500 p-2'>
          {isColor
            ? items.map((item, index) => (
                <ColorBadge
                  key={item.text}
                  onDelete={() => handleDelete(index)}
                  color={item.value}
                />
              ))
            : items.map((item, index) => (
                <SizeBadge
                  key={item.text}
                  onDelete={() => handleDelete(index)}
                  size={item.value}
                />
              ))}
        </div>
        {isColor !== null && (
          <DialogTrigger asChild>
            <Button type='button'>
              Thêm {isColor ? 'màu sắc' : 'kích thước'}{' '}
              <Plus className='h-4 w-4' />
            </Button>
          </DialogTrigger>
        )}
      </div>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm 1 màu sắc</DialogTitle>
          <DialogDescription>
            Chọn màu sắc bạn muốn thêm vào sản phẩm
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {isColor ? (
            <>
              <ColorPicker
                pickedColor={selectedItem}
                onPickColor={(color) => handlePickItem(color)}
              />
              {selectedItem && (
                <p>
                  Bạn đã chọn màu{' '}
                  <span
                    className={cn(selectedItem.color, 'px-2 font-semibold')}
                  >
                    {selectedItem.text}
                  </span>
                </p>
              )}
            </>
          ) : (
            <>
              <SizeList
                pickedSize={selectedItem}
                onPickSize={(size) => handlePickItem(size)}
              />
              {selectedItem && (
                <p>
                  Bạn đã chọn kích thước{' '}
                  <span className='px-2 font-semibold'>
                    {selectedItem.text}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' onClick={handleAdd}>
              Lưu
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
CategorySelector.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default CategorySelector;
