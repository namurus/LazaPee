import { DialogClose, DialogDescription, DialogFooter } from '../ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { TriangleAlert } from 'lucide-react';
import InputField from './InputField';
import LargeTextInputField from '../atoms/LargeTextInputField';
import { Button } from '../ui/button';
import ResponsiveDialog from './ResonsiveDialog';
import { useState } from 'react';
import PropTypes from 'prop-types';

function TemporaryClosureOptions({ activeID, onSelected }) {
  const [active, setActive] = useState(activeID);
  const options = [
    {
      id: 1,
      value: '1 tháng',
    },
    {
      id: 2,
      value: '2 tháng',
    },
    {
      id: 3,
      value: '3 tháng',
    },
  ];
  return (
    <div className='flex flex-wrap gap-4'>
      {options.map((option) => (
        <Button
          key={option.id}
          className='font-normal'
          variant={active === option.id ? 'default' : 'outline'}
          onClick={() => {
            setActive(option.id);
            onSelected(option);
          }}
        >
          {option.value}
        </Button>
      ))}
    </div>
  );
}

function TemporaryClosureDialog({ open, setOpen, onConfirmed }) {
  const [info, setInfo] = useState({
    description: '',
    option: null,
  });
  const [isSelected, setIsSelected] = useState(false);
  return (
    <ResponsiveDialog isOpen={open} setIsOpen={setOpen} title={'Tạm nghỉ Shop'}>
      <DialogDescription>
        Tạm dừng Shop trong một khoảng thời gian
      </DialogDescription>
      <div className='space-y-4'>
        <Alert variant={'destructive'}>
          <TriangleAlert className='h-4 w-4' />
          <AlertTitle>Lưu ý!</AlertTitle>
          <AlertDescription>
            Shop sẽ cần tối thiểu 1 tuần kể từ khi tạm nghỉ để có thể hoạt động
            trở lại.
          </AlertDescription>
        </Alert>
        <TemporaryClosureOptions
          activeID={info.option?.id}
          onSelected={(option) => {
            setIsSelected(true);
            setInfo({ ...info, option: option });
          }}
        />
        <InputField title={'Lý do tạm nghỉ'}>
          <LargeTextInputField
            placeholder='Nhập lý do nghỉ của bạn để thông báo với khách hàng'
            name='temporaryClosureReason'
            value={info.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            maxLength={500}
          />
        </InputField>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button className='font-normal' variant={'secondary'}>
            Huỷ
          </Button>
        </DialogClose>
        <Button
          className='font-normal'
          onClick={() => {
            onConfirmed({
              ...info,
              option: isSelected ? info.option : null,
            });
          }}
        >
          Xác nhận
        </Button>
      </DialogFooter>
    </ResponsiveDialog>
  );
}

TemporaryClosureOptions.propTypes = {
  onSelected: PropTypes.func.isRequired,
};

TemporaryClosureDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirmed: PropTypes.func.isRequired,
};

export default TemporaryClosureDialog;
