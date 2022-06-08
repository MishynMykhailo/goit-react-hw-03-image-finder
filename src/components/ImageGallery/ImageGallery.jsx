import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import { Component } from 'react';
import s from '../ImageGallery/ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
  };
  toggleModal(e) {
    console.log(e);
    this.state(({ showModal }) => ({ showModal: !showModal }));
  }
  render() {
    const { showModal } = this.state;
    return (
      <ul className={s.ImageGallery}>
        {this.props.imagesObj.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webURL={webformatURL}
              largeURL={largeImageURL}
              tags={tags}
              toggleModal={this.toggleModal}
            />
          )
        )}
        {showModal && <Modal />}
      </ul>
    );
  }
}
