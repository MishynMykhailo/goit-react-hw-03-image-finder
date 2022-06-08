import { Component } from 'react';

import s from '../Searchbar/Searchbar.module.css';
// import s from '../Searchbar/Searchbar.module.css';
export default class Searchbar extends Component {
  state = {
    search: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
    this.reset();
  };

  handleInput = e => {
    this.setState({
      search: e.currentTarget.value.toLowerCase(),
    });
  };
  reset = () => {
    this.setState({ search: '' });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}
