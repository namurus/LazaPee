import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='flex py-4'>
      <button
        className='flex items-center rounded-lg border px-[0.875rem] py-2'
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
      >
        <ChevronLeft className='mr-2' />
        Previous
      </button>
      <div className='flex flex-1 justify-evenly'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`aspect-square rounded-lg p-3 text-center leading-none ${currentPage === i + 1 ? 'bg-neutral' : ''}`}
            onClick={() => {
              onPageChange(i + 1);
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className='flex items-center rounded-lg border px-[0.875rem] py-2'
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
      >
        Next
        <ChevronRight className='ml-2' />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
