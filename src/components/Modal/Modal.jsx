import { useEffect } from 'react';
import { useAppContext } from 'components/ContextProvider/ContextProvider';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ url = 'no url', alt = 'no alt' }) => {
  const { setModalIndex } = useAppContext();
  const handleKeyUp = e => {
    if (e.key === 'Escape') setModalIndex(-1);
  };
  const closeModal = e => {
    if (e.target.className === css.Overlay) setModalIndex(-1);
  };
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img className={css.img} src={url} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
};
