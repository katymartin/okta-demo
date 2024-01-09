import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, onClick, ...props }) => {
  const [isToggled, setIsToggled] = useState(false);

  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const buttonClassName = ['storybook-button', `storybook-button--${size}`, mode].join(' ');

  const handleButtonClick = () => {
    setIsToggled(!isToggled);
    if (onClick) {
      onClick(!isToggled); // Pass the toggle status to the onClick handler
    }
  };

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={handleButtonClick}
      {...props}
    >
      {label} {isToggled ? 'Toggled' : 'Not Toggled'}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
