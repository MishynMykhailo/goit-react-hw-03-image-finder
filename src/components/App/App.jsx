import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import { Watch } from 'react-loader-spinner';
import s from '../App/App.module.css';
export class App extends Component {
  state = {
    images: null,
    search: '',
    error: null,
    status: 'idle',
  };

  // "idle"
  // "pending"
  // "rejected"
  // "resolve"

  onSubmitSearchBar = name => {
    this.setState({ search: name });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({ status: 'pending' });
      const fetchAPI = fetch(
        `https://pixabay.com/api/?q=${this.state.search}&page=1&key=26721460-a31d9fe7e52cee7d3858c2b4f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error(`Not Found ${this.state.search}`));
        })
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
      return fetchAPI;
    }
    // console.log(this.state.images);
  }
  render() {
    const { status } = this.state;
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
        {status === 'resolved' && (
          <ImageGallery imagesObj={this.state.images} />
        )}
        {/* <Modal /> */}
      </div>
    );
  }
}
