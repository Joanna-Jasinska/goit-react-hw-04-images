import { useAppContext } from 'components/ContextProvider/ContextProvider';
// import { PropTypes } from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import css from './ImageGallery.module.css';

export const ImageGallery = () => {
  const { gallery, setModalIndex } = useAppContext();
  const onClickHandle = i => {
    return e => {
      e.preventDefault();
      setModalIndex(i);
    };
  };

  return (
    <ul className={css.ImageGallery}>
      {gallery.map((img, i) => (
        <ImageGalleryItem
          key={nanoid()}
          id={img.id}
          miniature={img.miniature}
          url={img.url}
          alt={img.tags}
          onClick={onClickHandle(i)}
        />
      ))}
    </ul>
  );
};
