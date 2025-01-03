import { Store, ChevronRight, ShoppingBag, ShoppingCart } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Link } from 'react-router-dom';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Orders',
      url: 'orders',
      icon: ShoppingCart,
      items: [
        {
          title: 'All Orders',
          url: '#',
        },
        {
          title: 'Project Structure',
          url: '#',
        },
      ],
    },
    {
      title: 'Products',
      url: 'products',
      icon: ShoppingBag,
      items: [
        {
          title: 'All Products',
          url: '#',
          isActive: true,
        },
        {
          title: 'Add a Product',
          url: 'new',
        },
      ],
    },
    {
      title: 'Shop Management',
      url: 'shop-management',
      icon: Store,
      items: [
        {
          title: 'Shop Profile',
          url: 'profile',
        },
        {
          title: 'Shop Decoration',
          url: 'decoration',
        },
      ],
    },
  ],
};

function ShopSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link to='dashboard'>
                <span className='w-full font-display text-[2rem] font-bold leading-9 text-black'>
                  LAZAPEE
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {data.navMain.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem className='bg-white'>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className='group'>
                      {item.icon && <item.icon />}
                      <span className='text-base font-medium'>
                        {item.title}
                      </span>
                      <ChevronRight className='ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.items?.length ? (
                      <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
                        {item.items.map((subitem) => (
                          <SidebarMenuSubItem key={subitem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subitem.isActive}
                            >
                              <Link to={`${item.url}/${subitem.url}`}>
                                {subitem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default ShopSidebar;
