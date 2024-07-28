import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';

const ProductItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <div className='border-b py-4'>
    <div className='flex justify-between'>
      <div>
        <ProductInfo label='Product' value={item['product-id']} />
        <ProductInfo label='Description' value={item['description']} />
        <ProductInfo label='Category' value={item['category']} />
      </div>
      <div className='text-right text-sage'>
        <div className='flex items-center text-bluish-grey'>
          <span className='font-bold mr-2'>Quantity:</span>
          <div className='flex items-center'>
            <Button
              variant='secondary'
              className='font-medium px-2.5 py-1 mx-1'
              onClick={onIncrease}
            >
              +
            </Button>
            <p className='mx-2'>{item['quantity']}</p>
            <Button
              variant='secondary'
              className='font-medium px-2.5 py-1 mx-1'
              onClick={onDecrease}
            >
              -
            </Button>
          </div>
        </div>
        <ProductInfo label='Unit Price' value={`$${item['unit-price']}`} />
        <ProductInfo label='Total' value={`$${item['total']}`} />
      </div>
    </div>
    <div className='flex justify-end'>
      <Button variant='error' className='px-3 py-1 mt-3' onClick={onRemove}>
        Remove
      </Button>
    </div>
  </div>
);

const ProductInfo = memo(({ label, value }) => (
  <div className='text-bluish-grey'>
    <span className='font-bold'>{label}:</span> {value}
  </div>
));

ProductItem.propTypes = {
  item: PropTypes.shape({
    'product-id': PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    'unit-price': PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default ProductItem;
