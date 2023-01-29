import React from 'react';
import { products } from '../../mockData/products';
import GoodsCard from './components/GoodsCard';

function HomePage() {
  return (
    <div>
      <h1 className="h-100 h1 text-center pt-5 pb-3">Choose products to bye</h1>
      <div className="container d-flex flex-wrap justify-content-center">
        {products.map(product => (
          <GoodsCard
            key={product.id}
            imgUrl={product.imgUrl}
            cardDescription={product.cardDescription}
            cardTitle={product.cardTitle}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
