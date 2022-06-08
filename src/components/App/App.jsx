import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
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
      return fetch(
        `https://pixabay.com/api/?q=${this.state.search}&page=1&key=26721460-a31d9fe7e52cee7d3858c2b4f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Not Found ${this.state.search}`));
        })
        .then(res => this.setState({ images: res }))
        .catch(error => this.setState({ error }));
    }
    // console.log(this.state.images);
  }
  render() {
    // console.log(this.state.images);
    return (
      <div className={s.App}>
        <Searchbar
          onSubmit={this.onSubmitSearchBar}
          onChange={this.handleSearch}
        />
        {this.state.images && <ImageGallery imagesObj={this.state.images} />}
      </div>
    );
  }
}
