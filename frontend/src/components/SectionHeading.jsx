import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

function SectionHeading({ title = 'Section Heading', className }) {
  const defaultClassName =
    'section-heading text-balance text-center font-display text-3xl font-bold uppercase lg:text-5xl';
  const mergedClassName = twMerge(defaultClassName, className);

  return <h2 className={mergedClassName}>{title}</h2>;
}

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionHeading;
