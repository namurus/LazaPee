import SectionHeading from '../atoms/SectionHeading';
import { Mail } from 'lucide-react';
import LinkWithIcon from '../atoms/LinkWithIcon';
import { Button } from '../ui/button';

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
        <div className='w-full justify-self-end text-sm lg:max-w-[350px] lg:text-base'>
          <div className='mb-3 flex items-center gap-3 rounded-full bg-white px-5 py-3 text-black'>
            <Mail className='h-5 w-5' />
            <input
              type='email'
              placeholder='Enter your email address'
              className='w-full flex-1 border-none bg-transparent outline-none placeholder:font-light'
            />
          </div>

          {/* <InverseButton
            switchColor={true}
            style={'rounded-full px-4 py-3 hover:text-white'}
          >
            Subscribe to Newsletter
          </InverseButton> */}
          <Button
            variant='outline'
            className='w-full rounded-full px-4 py-3 text-black'
          >
            Subscribe to Newsletters
          </Button>
        </div>
      </div>
      <div className='bg-[#F0F0F0] p-4 pt-36 text-left text-black lg:pt-28'>
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
                <div className='space-x-3'>
                  {[
                    {
                      href: 'https://x.com/',
                      icon: <img src='/twitter.svg' alt='twitter' />,
                    },
                    {
                      href: 'https://facebook.com/',
                      icon: <img src='/facebook.svg' alt='facebook' />,
                    },
                    {
                      href: 'https://instagram.com/',
                      icon: <img src='/instagram.svg' alt='instagram' />,
                    },
                    {
                      href: 'https://github.com/',
                      icon: <img src='/github.svg' alt='github' />,
                    },
                  ].map((link) => (
                    <LinkWithIcon
                      key={link.href}
                      href={link.href}
                      icon={link.icon}
                    />
                  ))}
                </div>
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
