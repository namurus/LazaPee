import Footer from '../components/Footer';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import { ErrorContent } from './ErrorPage';

export default function Template({ children }) {
  return (
    <div className='flex min-h-screen flex-col font-primary'>
      <Header />
      <main className='flex flex-1 flex-col lg:[&>*:not(.full-screen-section)]:mx-24'>
        {children ? children : <ErrorContent />}
      </main>
      <Footer />
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.node,
};
