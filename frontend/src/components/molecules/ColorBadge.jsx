import { X } from 'lucide-react';
import { Badge } from '../ui/badge';
import config from '../../config/config';

const ColorVariants = config.colors;

import PropTypes from 'prop-types';

function ColorBadge({ onDelete, color }) {
  const variant = ColorVariants[color.toUpperCase()];
  return (
    <Badge className={`flex items-center gap-2 p-2 px-4`} onClick={onDelete}>
      <div className={`h-3 w-3 rounded-full bg-black ${variant.color}`} />
      <span className='uppercase'>{variant.text}</span>
      <X className='h-4 w-4 cursor-pointer' onClick={onDelete} />
    </Badge>
  );
}

ColorBadge.propTypes = {
  onDelete: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default ColorBadge;
