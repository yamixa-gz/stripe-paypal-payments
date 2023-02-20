import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsAsync } from '../../store/productsGetSlice/slice';
import { buyProductsWithStripeAsync } from '../../store/productsStripePostSlice/slice';
import HomeView from './HomeView';

function Home() {
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showPayPalModal, setShowPayPalModal] = useState(false);

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

  const onBuyWithStripe = async () => {
    const { payload: url } = await dispatch(
      buyProductsWithStripeAsync(selectedProducts),
    );
    window.location = url;
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <HomeView
      addSelectedProducts={addSelectedProducts}
      selectedProducts={selectedProducts}
      onBuyWithStripe={onBuyWithStripe}
      onBuyWithPayPal={() => setShowPayPalModal(true)}
      handleClose={() => setShowPayPalModal(false)}
      showPayPalModal={showPayPalModal}
    />
  );
}

export default Home;
