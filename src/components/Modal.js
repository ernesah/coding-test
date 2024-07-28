import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ openModal, children, handleClose }) => {
  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);

  if (!openModal) return null;

  return (
    <div
      className='fixed inset-0 flex justify-center items-center z-10 px-4 py-8 md:p-8 bg-black bg-opacity-50'
      onClick={handleClose}
    >
      <div
        className='bg-white w-full md:w-2/5 mx-auto rounded px-4 py-7 md:p-7'
        onClick={(e) => e.stopPropagation()}
      >
        <button className='w-fit flex ml-auto' onClick={handleClose}>
          x
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;
