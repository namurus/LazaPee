import Footer from '../components/Footer';
import Header from '../components/Header';
import PropTypes from 'prop-types';

export default function Template({ children }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      {children ? (
        children
      ) : (
        <div className='flex flex-1 flex-col items-center justify-center'>
          <h1 className='font-display text-6xl font-bold'>404</h1>
          <p className='font-primary text-xl'>Page not found</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.node,
};
