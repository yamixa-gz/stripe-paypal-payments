import React, { useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import env from 'react-dotenv';
import { buyProductsWithPaypalAsync } from '../../../store/productsPaypalPostSlice/slice';

function PayPalModal({ showPayPalModal, handleClose, selectedProducts }) {
  const paypal = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (showPayPalModal) {
      window.paypal
        .Buttons({
          createOrder: async () => {
            const { payload: orderId } = await dispatch(
              buyProductsWithPaypalAsync(selectedProducts),
            );

            return orderId;
          },
          onApprove: async (_, actions) => {
            await actions.order.capture();
            window.location = `${env.CLIENT_URL}/success`;
          },
        })
        .render(paypal.current);
    }
  }, [dispatch, selectedProducts, showPayPalModal]);

  return (
    <Modal show={showPayPalModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>PayPal payments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={paypal}></div>
      </Modal.Body>
    </Modal>
  );
}

export default PayPalModal;
