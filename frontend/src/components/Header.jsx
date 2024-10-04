import { NavLink } from 'react-router-dom';
import { IoSearchSharp, IoPersonCircle } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
export default function Header() {
  const navLinks = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];
  return (
    <header className='container mx-auto my-3 flex items-center gap-10 bg-white p-4'>
      <h1 className='font-display text-3xl font-bold'>SHOP.CO</h1>
      <nav className=''>
        {navLinks.map((link) => (
          <NavLink
            to={`/${link.toLowerCase().replace(' ', '-')}`}
            key={link}
            className='font-primary mx-6 font-medium'
          >
            {link}
          </NavLink>
        ))}
      </nav>
      <div className='flex h-12 flex-1 items-center gap-2 overflow-hidden rounded-full bg-[#F0F0F0] px-3 py-2'>
        <button className='cursor-pointer'>
          <IoSearchSharp className='fill-black opacity-40' />
        </button>
        <input
          type='text'
          className='flex-1 bg-transparent text-base leading-3 outline-none'
          placeholder='Search for products...'
        />
      </div>
      <div className='flex gap-4'>
        <FaShoppingCart className='h-6 w-6' />
        <IoPersonCircle className='h-6 w-6' />
      </div>
    </header>
  );
}
