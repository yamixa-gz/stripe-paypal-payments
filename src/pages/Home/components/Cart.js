import React from 'react';
import PropTypes from 'prop-types';
import classes from '../scss/Cart.module.scss';

function Cart({ children, total, onBuyWithStripe, onBuyWithPayPal }) {
  {
    return (
      <div className={classes.cartContainer}>
        <table className="table table-light table-striped">
          <thead className="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-4 fw-bolder text-success">{`Total: $${total}`}</div>
          <div className="d-flex">
            <button
              className="btn btn-success align-self-start m-1 fs-6 fw-bolder"
              onClick={onBuyWithStripe}
            >
              Buy with Stripe
            </button>
            <button
              className="btn btn-success align-self-start m-1 fs-6 fw-bolder"
              onClick={onBuyWithPayPal}
            >
              Buy with PayPal
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  children: PropTypes.node,
  total: PropTypes.number,
  onBuyWithStripe: PropTypes.func,
  onBuyWithPayPal: PropTypes.func,
};

Cart.defaultProps = {
  children: undefined,
  total: 0,
  onBuyWithStripe: () => {},
  onBuyWithPayPal: () => {},
};

export default Cart;
