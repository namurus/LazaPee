import Hero from '../organisms/Hero';
import BrandShowcase from '../organisms/BrandShowcase';
import ProductShowcase from '../organisms/ProductShowcase';
import CategoryShowcase from '../organisms/CategoryShowcase';
import CommentShowcase from '../organisms/CommentShowcase';

function HomePage() {
  const heroInfo = {
    displayTitle: 'FIND CLOTHES THAT MATCHES YOUR STYLE',
    displayText:
      'Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.',
    infoModules: [
      {
        primaryText: '200+',
        secondaryText: 'International Brands',
      },
      {
        primaryText: '2000+',
        secondaryText: 'High-Quality Products',
      },
      {
        primaryText: '30,000+',
        secondaryText: 'Happy Customers',
      },
    ],
  };
  return (
    <>
      <Hero {...heroInfo} />
      <BrandShowcase />
      <section className='py-4 [&>:not(:last-child)]:border-b-2'>
        <ProductShowcase showcaseTitle={'new arrivals'} />
        <ProductShowcase showcaseTitle={'top selling'} />
      </section>
      <CategoryShowcase />
      <CommentShowcase />
    </>
  );
}

export default HomePage;
