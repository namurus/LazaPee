import SectionHeading from './SectionHeading';
import { CiMail } from 'react-icons/ci';
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
} from 'react-icons/ti';
import { FaGithub } from 'react-icons/fa6';

function IconLinks() {
  return (
    <div className='space-x-3'>
      <a
        href='https://x.com/'
        target='_blank'
        rel='noreferrer'
        className='inline-block h-7 w-7 rounded-full border-1 border-black border-opacity-20 p-1 focus-within:bg-black focus-within:fill-white hover:bg-black hover:fill-white'
      >
        <TiSocialTwitter className='h-full w-full fill-inherit' />
      </a>
      <a
        href='https://facebook.com/'
        target='_blank'
        rel='noreferrer'
        className='inline-block h-7 w-7 rounded-full border-1 border-black border-opacity-20 p-1 transition-colors focus-within:bg-black focus-within:fill-white hover:bg-black hover:fill-white'
      >
        <TiSocialFacebook className='h-full w-full fill-inherit' />
      </a>
      <a
        href='https://instagram.com/'
        target='_blank'
        rel='noreferrer'
        className='inline-block h-7 w-7 rounded-full border-1 border-black border-opacity-20 p-1 transition-colors focus-within:bg-black focus-within:fill-white hover:bg-black hover:fill-white'
      >
        <TiSocialInstagram className='h-full w-full fill-inherit' />
      </a>
      <a
        href='https://github.com/'
        target='_blank'
        rel='noreferrer'
        className='inline-block h-7 w-7 rounded-full border-1 border-black border-opacity-20 p-1 transition-colors hover:bg-black hover:fill-white'
      >
        <FaGithub className='h-full w-full fill-inherit' />
      </a>
    </div>
  );
}

export default function Footer() {
  const navLinks = [
    {
      title: 'company',
      links: ['about', 'features', 'works', 'career'],
    },
    {
      title: 'help',
      links: [
        'Customer Support',
        'Delivery Details',
        'Terms & Conditions',
        'Privacy Policy',
      ],
    },
    {
      title: 'faq',
      links: ['Account', 'Manage Deliveries', 'Orders', 'Payment'],
    },
    {
      title: 'contact',
      links: ['Contact Us', 'Email Us', 'Call Us', 'Chat with Us'],
    },
  ];
  return (
    <footer className='text-center text-white'>
      <div className='mx-4 grid translate-y-1/2 grid-cols-1 gap-y-8 rounded-[1.25rem] bg-black px-6 py-7 sm:container sm:mx-auto lg:grid-cols-2 lg:gap-4 lg:px-16 lg:py-9'>
        <SectionHeading
          title='Stay up to date about our latest offers'
          className={
            'max-w-[35rem] text-balance text-left text-white lg:text-[2.5rem] lg:leading-[1.125]'
          }
        />
        <div className='w-full max-w-[350px] justify-self-end text-sm lg:text-base'>
          <div className='mb-3 flex items-center rounded-full bg-white px-4 py-3 text-black'>
            <CiMail className='mr-3 h-5 w-5' />
            <input
              type='email'
              placeholder='Enter your email address'
              className='w-full flex-1 border-none bg-transparent outline-none placeholder:font-light'
            />
          </div>
          <button className='w-full rounded-full bg-white px-4 py-3 text-black outline outline-2 transition-all hover:bg-transparent hover:text-inherit'>
            Subscribe to Newsletter
          </button>
        </div>
      </div>
      <div className='bg-[#F0F0F0] p-4 pt-36 text-left text-black'>
        <div className='sm:container sm:mx-auto'>
          <div className='gap-20 lg:flex lg:justify-between'>
            <div className='grid flex-1 grid-cols-2 gap-8 py-6 text-sm font-light md:grid-cols-3 lg:grid-cols-5 lg:text-base'>
              <div className='col-span-2 md:col-span-3 lg:col-span-1'>
                <h1 className='mb-[0.875rem] font-display text-3xl font-normal lg:text-4xl'>
                  LAZAPEE
                </h1>
                <p className='mb-5 text-balance text-sm font-light opacity-60'>
                  We have clothes that suits your style and which you&apos;re
                  proud to wear. From women to men.
                </p>
                <IconLinks />
              </div>
              {navLinks.map((navLink) => {
                return (
                  <div key={navLink.title}>
                    <h3 className='mb-4 font-normal uppercase tracking-[3px]'>
                      {navLink.title}
                    </h3>
                    <ul className='opacity-60'>
                      {navLink.links.map((link) => {
                        return (
                          <li
                            key={link}
                            className='mb-2 capitalize hover:underline'
                          >
                            <a href={`/`}>{link}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='flex justify-center border-t-[1px] border-black border-opacity-10 p-4'>
            <p className='text-sm font-light opacity-60'>
              LAZAPEE &copy; 2024-2024, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
