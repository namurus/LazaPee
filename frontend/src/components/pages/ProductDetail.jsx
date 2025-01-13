import { useLoaderData } from 'react-router-dom';
import ProductInforSection from '../organisms/ProductInfoSection';
import MainLayout from '../templates/MainLayout';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ProductReviewSection from '../organisms/ProductReviewSection';
import ShopInfoSection from '../organisms/ShopInfoSection';

function ProductDetail() {
  const product = useLoaderData();
  return (
    <MainLayout>
      <ProductInforSection product={product} />
      <Tabs
        aria-label='Tabs with icons'
        defaultValue='details'
        className='mt-6 justify-center text-black'
      >
        <TabsList className='flex justify-center bg-neutral-50'>
          <TabsTrigger className='px-4 py-2 text-xl' value='details'>
            Chi tiết sản phẩm
          </TabsTrigger>
          <TabsTrigger className='px-4 py-2 text-xl' value='rating-review'>
            Đánh giá &amp; Nhận xét
          </TabsTrigger>
          <TabsTrigger className='px-4 py-2 text-xl' value='shop'>
            Thông tin Shop
          </TabsTrigger>
        </TabsList>
        <TabsContent className='mt-4' value='details'>
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
        </TabsContent>
        <TabsContent className='mt-4' value='rating-review'>
          <ProductReviewSection productID={product.id} limit={4} />
        </TabsContent>
        <TabsContent className='mt-4' value='shop'>
          <ShopInfoSection product={product} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}

export default ProductDetail;
