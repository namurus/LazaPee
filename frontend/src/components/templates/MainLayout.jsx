import PropTypes from 'prop-types';
import Breadcrumbs from '../molecules/Breadcrumbs';

function MainLayout({ children }) {
  return (
    <div className='container mx-auto'>
      <Breadcrumbs />
      {children}
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
