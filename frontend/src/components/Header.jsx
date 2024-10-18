import { Link, NavLink, useMatches } from 'react-router-dom';
import { IoSearchSharp, IoPersonCircle } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../hooks/useAuth';
import InverseButton from './InverseButton';
export default function Header() {
  const { isAuthenticated } = useAuth();
  const navLinks = [
    {
      title: 'Shop',
      to: '/shop',
    },
    {
      title: 'On Sale',
      to: '/product/on-sale',
    },
    {
      title: 'New Arrivals',
      to: '/product/new-arrivals',
    },
    {
      title: 'Brands',
      to: '/brands',
    },
  ];
  const userOptions = ['Account', 'Orders', 'Voucher', 'Logout'];
  const [isUserOptionsVisible, setIsUserOptionsVisible] = useState(false);
  const matches = useMatches();
  const isHome = matches.every((match) => match.pathname === '/');
  const defaultClassname =
    'flex items-center gap-10 bg-white p-4 lg:container md:my-3 lg:mx-auto lg:px-0';

  return (
    <header
      className={
        isHome
          ? defaultClassname
          : twMerge(
              'border-b-1 border-black border-opacity-10',
              defaultClassname
            )
      }
    >
      <GiHamburgerMenu className='h-6 w-6 lg:hidden' />
      <Link to='/' className='flex-1 md:flex-grow-0'>
        <h1 className='font-display text-2xl font-bold lg:text-[2rem]'>
          LAZAPEE
        </h1>
      </Link>
      <nav className='hidden lg:block'>
        {navLinks.map((link) => (
          <NavLink
            to={link.to}
            key={link.title}
            className='mx-6 font-primary font-medium capitalize'
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
      <div className='flex flex-1 items-center justify-evenly gap-4'>
        <div className='flex items-center gap-2 overflow-hidden rounded-full px-3 py-2 md:h-12 md:flex-1 md:bg-[#F0F0F0]'>
          <button className='cursor-pointer'>
            <IoSearchSharp className='h-6 w-6 fill-black md:opacity-40' />
          </button>
          <input
            type='text'
            className='hidden w-0 bg-transparent font-primary text-base leading-3 outline-none md:block md:flex-1'
            placeholder='Search for products...'
          />
        </div>
        <Link to='/cart' className='lg:ml-4'>
          <FaShoppingCart className='h-6 w-6' />
        </Link>
        {isAuthenticated ? (
          <div
            className='relative'
            onClick={() => {
              setIsUserOptionsVisible(!isUserOptionsVisible);
            }}
          >
            <IoPersonCircle className='h-6 w-6 cursor-pointer hover:fill-red-400' />
            <div
              className={`${isUserOptionsVisible ? 'pointer-events-auto visible scale-100 opacity-100' : 'pointer-events-none invisible scale-0 opacity-0'} absolute -bottom-2 right-0 origin-top-right translate-y-full transition-all duration-300`}
              onMouseLeave={() => {
                setIsUserOptionsVisible(!isUserOptionsVisible);
              }}
            >
              <ul className='w-fit bg-red-500 p-4'>
                {userOptions.map((option) => (
                  <li key={option}>
                    <Link to={`/user/${option.toLowerCase()}`}>{option}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <Link to='/auth/login'>
            <InverseButton style={'px-4 py-2 rounded-full font-bold uppercase'}>
              signin
            </InverseButton>
          </Link>
        )}
      </div>
    </header>
  );
}
