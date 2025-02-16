import { IProduct, ProductState } from '../types/IProduct';
import Button from './Button';

interface GalleryProps {
  products: IProduct[];
  onBuy: (productId: number, price: string) => void;
  isBuyButtonVisible: boolean;
}

const Gallery = ({ products, onBuy, isBuyButtonVisible }: GalleryProps) => {
  return (
    <div className=''>
      <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => {
            console.log('product.state', product.state);
            console.log('product.state===0', product.state === 0);
            console.log(
              'product.state===ProductState.Avaiable',
              product.state === ProductState.Available,
            );
            return (
              <div key={product.id} className='group'>
                <div>
                  <a href={product.href}>
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className='aspect-square w-full rounded-lg bg-gray-200 object-contain group-hover:opacity-75 xl:aspect-7/8'
                    />
                    <h3 className='mt-4 text-sm'>{product.name}</h3>
                    <p className='mt-1 text-lg font-medium '>{product.price} ETH</p>
                  </a>
                </div>
                {isBuyButtonVisible && product.state === ProductState.Available ? (
                  <Button onClick={() => onBuy(product.id, product.price)}>Buy</Button>
                ) : Number(product.state) === ProductState.Purchased ? (
                  <Button>Sold</Button>
                ) : product.state === ProductState.Shipped ? (
                  <Button>Sold and Shipped</Button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
