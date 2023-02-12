import React from 'react';
import PropTypes from 'prop-types';

function CartRow({ index, name, quantity, amount }) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{amount}</td>
    </tr>
  );
}

CartRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  quantity: PropTypes.number,
  amount: PropTypes.string,
};

CartRow.defaultProps = {
  name: '',
  quantity: 0,
  amount: '0',
};
export default CartRow;
