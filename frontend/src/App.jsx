import Template from './pages/Teamplate';
import './styles/index.css';
import Hero from './components/Hero';
import BrandShowcase from './components/BrandShowcase';
import ProductShowcase from './components/ProductShowcase';
import CategoryShowcase from './components/CategoryShowcase';

function App() {
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
    <Template>
      <Hero {...heroInfo} />
      <BrandShowcase />
      <section className='py-4 [&>:not(:last-child)]:border-b-2'>
        <ProductShowcase showcaseTitle={'new arrivals'} />
        <ProductShowcase showcaseTitle={'top selling'} />
      </section>
      <CategoryShowcase />
    </Template>
  );
}

export default App;
