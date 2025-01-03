import { Edit, Milestone, Package2 } from 'lucide-react';
import IconCircle from '../atoms/IconCircle';
import { Button } from '../ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { useState } from 'react';
import AddressTag from './AddressTag';
import { toast } from 'sonner';

export function SelectDelivery({ onConfirm, onCancel }) {
  const [open, setOpen] = useState(false);
  const [selectedShippingUnit, setSelectedShippingUnit] = useState(null);
  const handleConfirm = () => {
    if (!selectedShippingUnit) {
      toast.error('Vui lòng chọn một đơn vị vận chuyển');
      return;
    }
    onConfirm(selectedShippingUnit);
  };
  const shippingUnits = [
    {
      id: 1,
      name: 'Giao hàng nhanh',
      value: 'fast',
    },
    {
      id: 2,
      name: 'Giao hàng tiết kiệm',
      value: 'saving',
    },
  ];
  return (
    <>
      <div className='space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <h2 className='font-semibold'>Chọn đơn vị vận chuyển</h2>
            <Button
              onClick={() => setOpen(!open)}
              className='h-max p-0'
              variant={'ghost'}
            >
              <Edit />
            </Button>
          </div>
          {open ? (
            <Command>
              <CommandInput placeholder='Tìm đơn vị vận chuyển' />
              <CommandList>
                <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                <CommandGroup>
                  {shippingUnits.map((unit) => (
                    <CommandItem
                      key={unit.id}
                      value={unit.name}
                      onSelect={(currentValue) => {
                        setSelectedShippingUnit(currentValue);
                        setOpen(false);
                      }}
                    >
                      {unit.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          ) : (
            <p className='text-sm text-muted-foreground'>
              {selectedShippingUnit}
            </p>
          )}
        </div>
        <div className='space-y-5'>
          <h2 className='font-semibold'>Địa chỉ lấy hàng</h2>
          <AddressTag
            addressInfo={{
              user: { name: 'Nguyễn Văn A', number: '0123456789' },
              address: 'Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
            }}
          />
        </div>
      </div>
      <DialogFooter>
        <Button className='font-normal' onClick={onCancel}>
          Huỷ
        </Button>
        <Button className='font-normal' onClick={handleConfirm}>
          Xác nhận
        </Button>
      </DialogFooter>
    </>
  );
}

function PrepareOrderDialog({ onConfirmOption }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleConfirm = () => {
    if (!selectedOption) {
      toast.error('Vui lòng chọn một phương thức giao hàng');
      return;
    }
    onConfirmOption(selectedOption);
  };
  return (
    <>
      <div className='grid grid-cols-2 gap-2 py-4'>
        <div
          className='relative flex cursor-pointer flex-col items-center gap-y-3 border bg-neutral-200 p-2'
          onClick={() => setSelectedOption('self')}
        >
          <IconCircle icon={<Milestone />} color={'green'} />
          <h2 className='text-center text-base font-bold capitalize'>
            Tôi sẽ tự mang hàng tới bưu cục
          </h2>
          <p className='text-center text-sm'>
            Bạn có thể gửi hàng tại bất kỳ bưu cục nào thuộc cùng Tỉnh/Thành phố
          </p>
        </div>
        <div
          className='flex cursor-pointer flex-col items-center gap-y-3 border bg-neutral-200 p-2'
          onClick={() => setSelectedOption('delivery')}
        >
          <IconCircle icon={<Package2 />} color={'blue'} />
          <h2 className='text-center text-base font-bold capitalize'>
            đơn vị vận chuyển đến lấy hàng
          </h2>
          <p className='text-center text-sm'>
            Đơn vị vận chuyển sẽ đến lấy hàng theo địa chỉ lấy hàng mà bạn đã
            xác nhận
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button className='font-normal' onClick={handleConfirm}>
          Xác nhận
        </Button>
      </DialogFooter>
    </>
  );
}

export default PrepareOrderDialog;
