import { X } from 'lucide-react';
import { Badge } from '../ui/badge';
import config from '../../config/config';
import PropTypes from 'prop-types';

const SizeVariants = config.sizes;

function SizeBadge({ onDelete, size }) {
  const variant = SizeVariants[size.toUpperCase()];
  return (
    <Badge className='flex items-center gap-2 p-2 px-4'>
      <span className='uppercase'>{variant.text}</span>
      <X className='h-4 w-4 cursor-pointer' onClick={onDelete} />
    </Badge>
  );
}

SizeBadge.propTypes = {
  onDelete: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
};

export default SizeBadge;
