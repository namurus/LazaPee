import { useLoaderData } from 'react-router-dom';
import ProductInforSection from '../organisms/ProductInfoSection';
import MainLayout from '../templates/MainLayout';

import { Tabs } from 'flowbite-react';
import { useState } from 'react';
import ProductReviewSection from '../organisms/ProductReviewSection';
import ShopInfoSection from '../organisms/ShopInfoSection';

function ProductDetail() {
  const product = useLoaderData();
  const [activeTab, setActiveTab] = useState(0);
  return (
    <MainLayout>
      <ProductInforSection product={product} />
      <Tabs
        aria-label='Tabs with icons'
        variant='underline'
        onActiveTabChange={(tab) => setActiveTab(tab)}
        className='mt-6 justify-center text-black first:text-xl [&>*]:first:flex-1 [&>*]:first:[&>*]:text-xl [&>*]:first:[&>*]:leading-[1.1] [&>*]:first:ring-0'
      >
        <Tabs.Item active title='Details' color='red'>
          <p className='font-light'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            nesciunt accusantium repellat obcaecati laudantium ullam est dolore
            unde natus reiciendis, et assumenda maxime voluptates laboriosam
            atque labore quos corrupti consequatur ipsa quisquam officia error
            quibusdam inventore! Aliquam accusantium perspiciatis, recusandae id
            repellat distinctio nobis nostrum quisquam excepturi, quia sint
            ipsam error eaque omnis adipisci assumenda tempora voluptatum iusto
            qui laudantium ab. Similique eaque officiis molestias facilis magni
            fugit quo perferendis possimus doloremque cum, voluptate, ab
            explicabo nemo corporis nisi voluptatem itaque omnis exercitationem
            fuga quae tenetur! Reiciendis consequatur quidem, quia illum
            necessitatibus odit explicabo. Molestiae cumque animi iusto
            recusandae voluptatum.
          </p>
        </Tabs.Item>
        <Tabs.Item title='Rating & Review'>
          <ProductReviewSection reviews={product.reviews} />
        </Tabs.Item>
        <Tabs.Item title='Shop'>
          <ShopInfoSection product={product} />
        </Tabs.Item>
      </Tabs>
    </MainLayout>
  );
}

export default ProductDetail;
