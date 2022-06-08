import ImageGalleryItem from 'components/ImageGalleryItem';
import s from '../ImageGallery/ImageGallery.module.css';
const ImageGallery = ({ imagesObj }) => {
  return (
    <ul className={s.ImageGallery}>
      {imagesObj.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webURL={webformatURL}
          largeURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
export default ImageGallery;
