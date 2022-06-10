import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
// import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import { Watch } from 'react-loader-spinner';
import s from '../App/App.module.css';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    images: null,
    page: 1,
    search: '',
    error: null,
    status: 'idle',
    showModal: false,
    modalImageId: null,
  };

  //Fn FetchAPI photo
  fetchAPI() {
    return fetch(
      `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=26721460-a31d9fe7e52cee7d3858c2b4f&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    ).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`Not Found ${this.state.search}`));
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({ status: 'pending', page: 1 });
      return this.fetchAPI()
        .then(images =>
          this.setState({ images: images.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page) {
      return this.fetchAPI().then(arr =>
        this.setState(prevState => ({
          images: [...prevState.images, ...arr.hits],
        }))
      );
    }
  }

  //Fn Open/Close modalWindow
  toggleModal() {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  }

  // Fn Edit state - search
  onSubmitSearchBar = name => {
    this.setState({ search: name });
  };

  modalSetId = id => {
    if (this.state.images) {
      return this.state.images.find(image => image.id === id);
    }
  };
  //Fn takes id images
  gallerySetId = id => {
    this.setState({ modalImageId: id });
    this.toggleModal();
  };

  //Fn nextPage <btn>Load more </btn>
  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { status, showModal } = this.state;
    return (
      <div className={s.App}>
        <Searchbar
          onSubmit={this.onSubmitSearchBar}
          onChange={this.handleSearch}
        />
        {status === 'pending' && (
          <span className={s.Loader}>
            <Watch ariaLabel="loading-indicator" />
          </span>
        )}
        {status === 'pending' ||
          (showModal && (
            <Modal
              onClose={() => this.toggleModal()}
              imageURL={this.modalSetId(this.state.modalImageId).largeImageURL}
              tags={this.modalSetId(this.state.modalImageId).tags}
            />
          ))}
        {status === 'resolved' && (
          <ImageGallery
            imagesObj={this.state.images}
            onGalleryId={this.gallerySetId}
          />
        )}
        <div className={s.ButtonDiv}>
          {status === 'resolved' && <Button nextPage={this.nextPage} />}
        </div>
      </div>
    );
  }
}
