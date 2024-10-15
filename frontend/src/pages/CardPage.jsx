import Breadcrumbs from '../components/Breadcrumbs';

function CardPage() {
  return (
    <div>
      <Breadcrumbs />
      <h1 className='font-display text-[2rem]'>Your cart</h1>
      <div className='card-list'></div>
    </div>
  );
}

export default CardPage;
