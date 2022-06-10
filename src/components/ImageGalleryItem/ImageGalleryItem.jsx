import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webURL, largeURL, tags, onClickItemImage, id }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={() => onClickItemImage(id)}>
      <img className={s.ImageGalleryItemImage} src={webURL} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;
