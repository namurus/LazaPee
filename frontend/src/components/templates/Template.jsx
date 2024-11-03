import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import PropTypes from 'prop-types';
// import { ErrorContent } from './ErrorPage';

export default function Template({ children }) {
  if (!children) {
    throw new Error('Template component requires children prop');
  }
  return (
    <div className='flex min-h-screen flex-col font-primary'>
      <Header />
      <main className='flex flex-1 flex-col [&>*:not(.full-screen-section)]:mx-4'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.node,
};
