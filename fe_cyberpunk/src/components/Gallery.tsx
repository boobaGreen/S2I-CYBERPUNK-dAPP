import { IProduct } from '../types/IProduct';

interface GalleryProps {
  products: IProduct[];
}

const Gallery = ({ products }: GalleryProps) => {
  return (
    <div className=''>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <a key={product.id} href={product.href} className='group'>
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className='aspect-square w-full rounded-lg bg-gray-200 object-contain group-hover:opacity-75 xl:aspect-7/8'
              />
              <h3 className='mt-4 text-sm'>{product.name}</h3>
              <p className='mt-1 text-lg font-medium '>{product.price} ETH</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
