import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Компонент с состоянием.
 * Отображает модальное окно, открываемое по нажатию на кнопку.
 */
function TextModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => setIsOpen((state) => !state);

  return (
    <div>
      <button
        type="button"
        aria-label={`${isOpen ? 'Закрыть' : 'Открыть'} модальное окно`}
        onClick={onClickHandler}
      />
      <div
        role="dialog"
        aria-labelledby="dialogTitle"
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div>
          <h3 id="dialogTitle">{children}</h3>
        </div>
      </div>
    </div>
  );
}

TextModal.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TextModal;
