import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsAsync } from '../../store/productsGetSlice/slice';
import { buyProductsWithStripeAsync } from '../../store/productsStripePostSlice/slice';
import HomeView from './HomeView';

function Home() {
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState({});

  const addSelectedProducts = (id, name, priceInCents, productQuantity = 1) => {
    setSelectedProducts(selectedProducts => {
      const quantity =
        (selectedProducts?.[id]?.quantity || 0) + productQuantity;

      return {
        ...selectedProducts,
        [id]: {
          name,
          quantity,
          amount: ((quantity * priceInCents) / 100).toFixed(2),
        },
      };
    });
  };

  const onBuyWithStripe = () => {

    dispatch(buyProductsWithStripeAsync(selectedProducts));
  };

  const onBuyWithPayPal = () => {};

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <HomeView
      addSelectedProducts={addSelectedProducts}
      selectedProducts={selectedProducts}
      onBuyWithStripe={onBuyWithStripe}
      onBuyWithPayPal={onBuyWithPayPal}
    />
  );
}

export default Home;
