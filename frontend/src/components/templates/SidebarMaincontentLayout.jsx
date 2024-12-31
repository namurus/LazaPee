import { useMatches } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Separator } from '../ui/separator';
import { SidebarInset, SidebarTrigger } from '../ui/sidebar';

import PropTypes from 'prop-types';
import { Fragment } from 'react';

function SidebarMaincontentLayout({ children }) {
  const matches = useMatches();
  const breadcrumbItems = matches.map((item) => {
    return item.handle.crumb();
  });
  return (
    <SidebarInset>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => {
                return index === breadcrumbItems.length - 1 ? (
                  <BreadcrumbPage key={item.name}>{item.name}</BreadcrumbPage>
                ) : (
                  <Fragment key={item.name}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.path}>
                        {item.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className='flex-1 p-4'>{children}</main>
    </SidebarInset>
  );
}

SidebarMaincontentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarMaincontentLayout;
