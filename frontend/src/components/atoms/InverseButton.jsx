import { twMerge } from 'tailwind-merge';
import PropType from 'prop-types';

function InverseButton({ children, style, switchColor = false, ...rest }) {
  const defaultStyle =
    'hover:bg-transparent w-full outline outline-2 transition-all';
  const mergedStyle = switchColor
    ? twMerge(
        defaultStyle,
        'bg-neutral-900 text-accent hover:text-neutral-900 outline-neutral-900'
      )
    : twMerge(
        defaultStyle,
        'bg-accent text-neutral-900 hover:text-accent outline-accent'
      );
  return (
    <button
      className={style ? twMerge(mergedStyle, style) : mergedStyle}
      {...rest}
    >
      {children}
    </button>
  );
}

InverseButton.propTypes = {
  children: PropType.node.isRequired,
  style: PropType.string,
  switchColor: PropType.bool,
};

export default InverseButton;
