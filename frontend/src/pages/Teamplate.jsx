import Footer from '../components/Footer';
import Header from '../components/Header';
import PropTypes from 'prop-types';

export default function Template({ children }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.node,
};
