import React from 'react';
import classes from '../scss/GoodsCard.module.scss';
import PropTypes from 'prop-types';

const GoodsCard = ({
  id,
  imgUrl,
  cardTitle,
  cardDescription,
  buttonTitle,
  currencySymbol,
  priceInCents,
  onAdd,
}) => {
  const price = (priceInCents / 100).toFixed(2);

  return (
    <div className={`card ${classes.cardContainer} m-2 d-flex flex-column`}>
      <img src={imgUrl} className="card-img-top" alt={cardTitle} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bolder fs-5">{cardTitle}</h5>
        <p className="card-text flex-grow-1">{cardDescription}</p>
        <div className="d-flex justify-content-between align-items-center text-center">
          <button
            onClick={() => onAdd(id, cardTitle, priceInCents)}
            className="btn btn-success align-self-start"
          >
            {buttonTitle}
          </button>
          <div className="fs-4 fw-bolder text-success">{`${currencySymbol}${price}`}</div>
        </div>
      </div>
    </div>
  );
};

GoodsCard.propTypes = {
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string,
  priceInCents: PropTypes.number,
  onAdd: PropTypes.func,
};

GoodsCard.defaultProps = {
  buttonTitle: 'Add to cart',
  currencySymbol: '$',
  priceInCents: '0',
  onAdd: () => null,
};

export default GoodsCard;
