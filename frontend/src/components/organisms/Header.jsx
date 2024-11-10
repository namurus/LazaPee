import { Form, Link, NavLink, useMatches } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../hooks/useAuth';
import InverseButton from '../atoms/InverseButton';
import { Avatar, Dropdown } from 'flowbite-react';
export default function Header() {
  const { isAuthenticated, user } = useAuth();
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
  const userOptions = ['Account', 'Orders', 'Voucher'];
  const matches = useMatches();
  const isHome = matches.every((match) => match.pathname === '/');
  const defaultClassname =
    'flex items-center gap-10 bg-white p-4 lg:container md:mt-3 lg:mx-auto lg:px-0';

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
        <Form
          className='flex items-center gap-2 overflow-hidden rounded-full px-3 py-2 md:h-12 md:flex-1 md:bg-[#F0F0F0]'
          method='post'
        >
          <button type='submit' className='cursor-pointer'>
            <IoSearchSharp className='h-6 w-6 fill-black md:opacity-40' />
          </button>
          <input
            type='text'
            className='hidden w-0 border-none bg-transparent font-primary text-base leading-3 outline-none md:block md:flex-1'
            placeholder='Search for products...'
            name='search'
          />
        </Form>
        <div></div>
        <Link to='/cart' className='lg:ml-4'>
          <FaShoppingCart className='h-6 w-6' />
        </Link>
        {isAuthenticated ? (
          <Dropdown
            label={
              <Avatar
                img={`https://i.pinimg.com/originals/c7/ae/40/c7ae40f6a425e144f7dd8cee87128aed.jpg`}
                alt={user.firstName}
                size='sm'
                rounded
                color='gray'
              />
            }
            arrowIcon={false}
            inline
            className='bg-transparent'
          >
            <Dropdown.Header>
              <span className='block text-sm'>{user.firstName}</span>
              <span className='block truncate text-sm font-medium'>
                {user.email}
              </span>
            </Dropdown.Header>
            {userOptions.map((option) => (
              <Dropdown.Item key={option}>
                <Link to={`/user/${option.toLowerCase()}`}>{option}</Link>
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to={`/auth/logout`}>Logout</Link>
            </Dropdown.Item>
          </Dropdown>
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
