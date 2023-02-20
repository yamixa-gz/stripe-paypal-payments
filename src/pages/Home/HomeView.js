import React from 'react';
import { useSelector } from 'react-redux';
import GoodsCard from './components/GoodsCard';
import Loader from '../../components/Loader/Loader';
import Cart from './components/Cart';
import PropTypes from 'prop-types';
import CartRow from './components/CartRow';
import PayPalModal from './components/PayPalModal';

function HomeView({
  addSelectedProducts,
  selectedProducts,
  onBuyWithStripe,
  onBuyWithPayPal,
  handleClose,
  showPayPalModal,
}) {
  const {
    data: products,
    isLoading,
  } = useSelector(({ products }) => products);

  const productsList = products?.map(product => (
    <GoodsCard
      id={product.id}
      key={product.id}
      imgUrl={product.imgUrl}
      cardDescription={product.cardDescription}
      cardTitle={product.cardTitle}
      currencySymbol={product?.price?.symbol}
      priceInCents={product?.price?.priceInCents}
      onAdd={addSelectedProducts}
    />
  ));

  const { cartProductsRows, total } = Object.entries(selectedProducts).reduce(
    (acc, [id, { name, quantity, amount }], index) => {
      return {
        ...acc,
        cartProductsRows: [
          ...acc.cartProductsRows,
          <CartRow
            key={id}
            index={index + 1}
            name={name}
            quantity={quantity}
            amount={amount}
          />,
        ],
        total: +acc.total + +amount,
      };
    },
    { cartProductsRows: [], total: 0 },
  );

  return (
    <div>
      <h1 className="h-100 h1 text-center pt-5 pb-3">Choose products to buy</h1>
      <div className="container d-flex flex-wrap justify-content-center flex-column">
        <div className="d-flex justify-content-center">
          {!!cartProductsRows.length && (
            <Cart
              total={total}
              onBuyWithStripe={onBuyWithStripe}
              onBuyWithPayPal={onBuyWithPayPal}
            >
              {cartProductsRows}
            </Cart>
          )}
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {isLoading ? <Loader /> : productsList}
        </div>
      </div>
      <PayPalModal
        showPayPalModal={showPayPalModal}
        handleClose={handleClose}
        selectedProducts={selectedProducts}
      />
    </div>
  );
}

HomeView.propTypes = {
  addSelectedProducts: PropTypes.func,
  onBuyWithStripe: PropTypes.func,
  onBuyWithPayPal: PropTypes.func,
  selectedProducts: PropTypes.shape({}),
  handleClose: PropTypes.func,
  showPayPalModal: PropTypes.bool,
};

HomeView.defaultProps = {
  addSelectedProducts: () => {},
  selectedProducts: undefined,
  onBuyWithStripe: () => {},
  onBuyWithPayPal: () => {},
  handleClose: () => {},
  showPayPalModal: false,
};
export default HomeView;
