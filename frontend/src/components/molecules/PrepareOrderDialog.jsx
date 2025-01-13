import {
  Check,
  CheckCheck,
  CircleCheck,
  Edit,
  Milestone,
  Package2,
} from 'lucide-react';
import IconCircle from '../atoms/IconCircle';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { useEffect, useState } from 'react';
import AddressTag from './AddressTag';
import { toast } from 'sonner';
import { getShippingUnits } from '../../api/admin/product';
import Image from '../atoms/Image';
import { useAuth } from '../../hooks/useAuth';

function SelectDelivery({ onConfirm, onCancel }) {
  const [open, setOpen] = useState(false);
  const [selectedShippingUnit, setSelectedShippingUnit] = useState(null);
  const handleConfirm = () => {
    if (!selectedShippingUnit) {
      toast.error('Vui lòng chọn một đơn vị vận chuyển');
      return;
    }
    onConfirm(selectedShippingUnit);
  };
  const [shippingUnits, setShippingUnits] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchData() {
      try {
        const json = await getShippingUnits();
        console.log(json);
        setShippingUnits(json.shippingCompanies);
      } catch (error) {
        console.error(error);
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    }
    fetchData();
  }, []);
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
                      value={unit.id}
                      onSelect={(currentValue) => {
                        setSelectedShippingUnit(currentValue);
                        setOpen(false);
                      }}
                    >
                      <div className='flex items-center gap-2'>
                        <Image
                          src={unit.thumbnail}
                          alt={unit.name}
                          className='h-6 w-6'
                        />
                        <p>{unit.name}</p>
                      </div>
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
              user: { name: user.fullName, number: user.phone },
              address: user.address,
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
          {selectedOption === 'self' && (
            <CircleCheck className='absolute -right-2 -top-2 rounded-full fill-primary text-secondary' />
          )}
        </div>
        <div
          className='relative flex cursor-pointer flex-col items-center gap-y-3 border bg-neutral-200 p-2'
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
          {selectedOption === 'delivery' && (
            <CircleCheck className='absolute -right-2 -top-2 rounded-full fill-primary text-secondary' />
          )}
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
export { SelectDelivery };
