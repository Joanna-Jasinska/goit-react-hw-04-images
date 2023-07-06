import { PropTypes } from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  onClick,
  id = 'no id',
  miniature = 'no miniature',
  alt = 'no alt',
}) => {
  return (
    <li className={css.galleryItem} id={id} onClick={onClick}>
      <img src={miniature} className={css.galleryItemImage} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  miniature: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
