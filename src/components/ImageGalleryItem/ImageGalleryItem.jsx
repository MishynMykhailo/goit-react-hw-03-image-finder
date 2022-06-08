import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webURL, largeURL, tags, toggleModal }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img className={s.ImageGalleryItemImage} src={webURL} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;
