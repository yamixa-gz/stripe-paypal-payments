import React from 'react';
import classes from '../scss/HomePage.module.scss';
import PropTypes from 'prop-types';

const GoodsCard = ({
  imgUrl,
  cardTitle,
  cardDescription,
  buttonTitle,
  onClick,
}) => {
  return (
    <div className={`card ${classes.cardContainer} m-2 d-flex flex-column`}>
      <img src={imgUrl} className="card-img-top" alt={cardTitle} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text flex-grow-1">{cardDescription}</p>
        <button onClick={onClick} className="btn btn-success align-self-start">
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

GoodsCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

GoodsCard.defaultProps = {
  buttonTitle: 'Add to cart',
  onClick: () => null,
};

export default GoodsCard;
