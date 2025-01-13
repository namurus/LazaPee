import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import PrepareOrderDialog, {
  SelectDelivery,
} from '../molecules/PrepareOrderDialog';
import ResponsiveDialog from '../molecules/ResonsiveDialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Ellipsis, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ValueConverter from '../../helpers/ValueConverter';

const data = [
  {
    id: 2,
    customerId: 2,
    shopId: 2,
    status: 'pending',
    fullName: 'Jane Doe',
    phoneNumber: '2345678901',
    shippingAddress: '456 Elm St, Los Angeles, CA 90001',
    shippingType: 'express',
    totalAmount: 999.99,
    orderNote: 'Please deliver before 5 PM',
    paymentMethod: 'COD',
    shippingCompany: 'FedEx',
    shippingFee: 20,
    createdAt: '2025-01-12T10:53:32.000Z',
    updatedAt: '2025-01-12T10:53:32.000Z',
    deletedAt: null,
    OrderItems: [],
  },
  {
    id: 7,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'COD',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-12T12:20:07.000Z',
    updatedAt: '2025-01-12T12:20:07.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 6,
        orderId: 7,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 5,
        orderId: 7,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 9,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit_card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-12T12:26:17.000Z',
    updatedAt: '2025-01-12T12:26:17.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 9,
        orderId: 9,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 8,
        orderId: 9,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 11,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit_card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-12T12:27:17.000Z',
    updatedAt: '2025-01-12T12:27:17.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 12,
        orderId: 11,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 11,
        orderId: 11,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 13,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-12T12:29:28.000Z',
    updatedAt: '2025-01-12T12:29:28.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 15,
        orderId: 13,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 14,
        orderId: 13,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 15,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-12T12:33:07.000Z',
    updatedAt: '2025-01-12T12:33:07.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 18,
        orderId: 15,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 17,
        orderId: 15,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 17,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T03:04:11.000Z',
    updatedAt: '2025-01-13T03:04:11.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 21,
        orderId: 17,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 20,
        orderId: 17,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 19,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T03:07:11.000Z',
    updatedAt: '2025-01-13T03:07:11.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 24,
        orderId: 19,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 23,
        orderId: 19,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 21,
    customerId: 1,
    shopId: 2,
    status: 'canceled',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T03:35:59.000Z',
    updatedAt: '2025-01-13T03:44:10.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 27,
        orderId: 21,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 26,
        orderId: 21,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 23,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 5400,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T03:42:48.000Z',
    updatedAt: '2025-01-13T03:42:48.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 30,
        orderId: 23,
        skusId: 8,
        quantity: 1,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 29,
        orderId: 23,
        skusId: 8,
        quantity: 2,
        price: 1800,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 25,
    customerId: 1,
    shopId: 2,
    status: 'canceled',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 9000,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T03:45:50.000Z',
    updatedAt: '2025-01-13T03:53:35.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 33,
        orderId: 25,
        skusId: 8,
        quantity: 1,
        price: 3000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 32,
        orderId: 25,
        skusId: 8,
        quantity: 2,
        price: 3000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 27,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 9000,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T03:58:21.000Z',
    updatedAt: '2025-01-13T03:58:21.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 36,
        orderId: 27,
        skusId: 8,
        quantity: 1,
        price: 3000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 35,
        orderId: 27,
        skusId: 8,
        quantity: 2,
        price: 3000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 29,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 9000,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T04:07:46.000Z',
    updatedAt: '2025-01-13T04:07:46.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 39,
        orderId: 29,
        skusId: 8,
        quantity: 1,
        price: 3000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
      {
        id: 38,
        orderId: 29,
        skusId: 8,
        quantity: 2,
        price: 3000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 30,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 6000,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T04:24:25.000Z',
    updatedAt: '2025-01-13T04:24:25.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 40,
        orderId: 30,
        skusId: 8,
        quantity: 2,
        price: 3000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 31,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 20000,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T04:25:55.000Z',
    updatedAt: '2025-01-13T04:25:55.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 41,
        orderId: 31,
        skusId: 8,
        quantity: 2,
        price: 10000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 32,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 20000,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    createdAt: '2025-01-13T04:40:07.000Z',
    updatedAt: '2025-01-13T04:40:07.000Z',
    deletedAt: null,
    OrderItems: [
      {
        id: 42,
        orderId: 32,
        skusId: 8,
        quantity: 2,
        price: 10000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: 3,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            images: [],
          },
        },
      },
    ],
  },
];

const OrderDetailDialog = ({ order, onClose, open, setOpen }) => {
  return (
    <ResponsiveDialog
      onClose={onClose}
      isOpen={open}
      setIsOpen={setOpen}
      title={'Chi tiết đơn hàng'}
      description={'Chi tiết đơn hàng'}
    >
      <div className='flex flex-col gap-4'>
        <div>
          <h3 className='text-lg font-semibold'>Thông tin đơn hàng</h3>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-gray-500'>ID: {order.id}</p>
            <p className='text-sm text-gray-500'>Trạng thái: {order.status}</p>
            <p className='text-sm text-gray-500'>
              Vận chuyển: {order.shippingCompany}
            </p>
            <p className='text-sm text-gray-500'>
              Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Thông tin người nhận</h3>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-gray-500'>{order.fullName}</p>
            <p className='text-sm text-gray-500'>{order.phoneNumber}</p>
            <p className='text-sm text-gray-500'>{order.shippingAddress}</p>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Sản phẩm</h3>
          <div className='flex flex-col gap-2'>
            {order.OrderItems.map((item) => (
              <div key={item.id} className='flex flex-col gap-2'>
                <p className='text-sm text-gray-500'>
                  {item.sku.product.productName}
                </p>
                <p className='text-sm text-gray-500'>
                  Số lượng: {item.quantity}
                </p>
                <p className='text-sm text-gray-500'>
                  Giá: {ValueConverter.formatCurrency(item.price, 'VND')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

function OrderManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState({
    activeDialog: null,
    selectedOrder: null,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const columns = [
  //   { header: 'ID', accessorKey: 'id' },
  //   { header: 'Tên sản phẩm', accessorKey: 'productName' },
  //   {
  //     header: 'Tổng đơn hàng',
  //     accessorKey: 'orderTotal',
  //     cell: ({ row }) => {
  //       const total = parseFloat(row.getValue('orderTotal'));
  //       const formatted = CurrencyFormatter.formatWithLocaleInfo(total, 'VND');
  //       return <p className='text-sm text-muted-foreground'>{formatted}</p>;
  //     },
  //   },
  //   { header: 'Trạng thái', accessorKey: 'state' },
  //   { header: 'Vận chuyển', accessorKey: 'delivery' },
  //   {
  //     accessorKey: 'actions',
  //     header: 'Thao tác',
  //     cell: ({ row }) => {
  //       const rowData = row.original;
  //       return (
  //         <p
  //           className='cursor-pointer text-blue-600'
  //           onClick={() => handleAction(rowData)}
  //         >
  //           {row.getValue('actions')}
  //         </p>
  //       );
  //     },
  //   },
  // ];

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Sản phẩm',
      accessorKey: 'OrderItems',
      cell: ({ row }) => {
        const items = row.original.OrderItems;
        return (
          items.map((item) => item.sku.product.productName).join(', ') || ''
        );
      },
    },
    {
      header: 'Tổng tiền',
      accessorKey: 'totalAmount',
      cell: ({ row }) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(row.original.totalAmount);
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusText = {
          pending: 'Chờ xử lý',
          canceled: 'Đã hủy',
          delivering: 'Đang giao',
          completed: 'Hoàn thành',
        };
        return statusText[status] || status;
      },
    },
    {
      header: 'Vận chuyển',
      accessorKey: 'shippingCompany',
    },
    {
      header: 'Thông tin người nhận',
      accessorKey: 'fullName',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div>
            <div>{order.fullName}</div>
            <div className='text-sm text-gray-500'>{order.phoneNumber}</div>
            <div className='text-sm text-gray-500'>{order.shippingAddress}</div>
          </div>
        );
      },
    },
    {
      header: 'Ngày đặt',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString('vi-VN');
      },
    },
    {
      header: 'Thao tác',
      id: 'actions',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {status === 'pending' && (
                <DropdownMenuItem onSelect={() => handleAction(row.original)}>
                  Chuẩn bị hàng
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onSelect={() => handleViewDetail(row.original)}>
                Xem chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAction = (order) => {
    setSelectedOrder({
      ...order,
      renderInfo: {
        title: 'Chuẩn bị hàng',
        description: `Chuẩn bị hàng cho đơn hàng #${order.id}`,
        rederComponent: (
          <PrepareOrderDialog
            onConfirmOption={(option) => handleOptionSelect(option)}
          />
        ),
      },
    });
    setIsOpen(true);
  };

  const handleViewDetail = (order) => {
    console.log(order);
    setOpen({
      activeDialog: 'orderDetail',
      selectedOrder: order,
    });
  };

  const handleOptionSelect = (option) => {
    switch (option) {
      case 'self':
        setIsOpen(false);
        // Do nothing for now
        break;
      case 'delivery':
        setSelectedOrder((prev) => {
          return {
            ...prev,
            renderInfo: {
              title: 'Chuẩn bị hàng',
              description: null,
              rederComponent: (
                <SelectDelivery
                  onCancel={() => {
                    setIsOpen(false);
                    // clear selected order
                    setSelectedOrder(null);
                  }}
                  onConfirm={() => {
                    setIsOpen(false);
                    // Do nothing for now
                  }}
                />
              ),
            },
          };
        });
        break;
      default:
        break;
    }
  };
  return (
    <SidebarMaincontentLayout>
      <Tabs defaultValue='all' onValueChange={(value) => console.log(value)}>
        <TabsList className='mb-6 grid w-max grid-cols-4 gap-4'>
          <TabsTrigger value='all'>Tất cả</TabsTrigger>
          <TabsTrigger value='pending'>Chờ xác nhận</TabsTrigger>
          <TabsTrigger value='delivering'>Đang giao</TabsTrigger>
          <TabsTrigger value='completed'>Đã giao</TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <DataTable
            columns={columns}
            data={data}
            options={{
              search: {
                searchColumn: 'OrderItems',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
        <TabsContent value='pending'>
          <DataTable
            columns={columns}
            data={data.filter((order) => order.status === 'pending')}
            options={{
              search: {
                searchColumn: 'OrderItems',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
        <TabsContent value='delivering'>
          <DataTable
            columns={columns}
            data={data.filter((order) => order.status === 'delivering')}
            options={{
              search: {
                searchColumn: 'OrderItems',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
        <TabsContent value='completed'>
          <DataTable
            columns={columns}
            data={data.filter((order) => order.status === 'completed')}
            options={{
              search: {
                searchColumn: 'OrderItems',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
      </Tabs>
      <>
        {selectedOrder && (
          <ResponsiveDialog
            title={selectedOrder.renderInfo.title}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            description={selectedOrder.renderInfo.description}
          >
            {selectedOrder.renderInfo.rederComponent}
          </ResponsiveDialog>
        )}
        {open.activeDialog === 'orderDetail' && (
          <OrderDetailDialog
            order={open.selectedOrder}
            open={open.activeDialog === 'orderDetail'}
            setOpen={() => setOpen({ activeDialog: null, selectedOrder: null })}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </>
    </SidebarMaincontentLayout>
  );
}

export default OrderManagement;
