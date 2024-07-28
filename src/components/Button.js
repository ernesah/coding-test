import clsx from 'clsx';
import PropTypes from 'prop-types';

const Button = ({ variant, children, className, onClick, ...props }) => {
  const baseStyles = 'flex justify-center items-center rounded-md px-4 py-2.5';
  const variantStyles = {
    primary: 'bg-sage text-white ',
    secondary: 'border border-sage text-sage ',
    error: 'bg-red-500 text-white '
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'error']).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
