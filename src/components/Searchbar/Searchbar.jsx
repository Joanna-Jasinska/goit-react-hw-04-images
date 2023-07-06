import { useState } from 'react';
import { useAppContext } from 'components/ContextProvider/ContextProvider';
import { PropTypes } from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ searchHandle }) => {
  const { query, setQuery } = useAppContext();
  const [input, setInput] = useState(query);
  const inputHandle = e => setInput(e.target.value);
  const submitHandle = e => {
    e.preventDefault();
    setQuery(input);
    searchHandle();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={submitHandle}>
        <button type="submit" className={css.button}>
          <span className={css.label}>🔍</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          name="query"
          value={input}
          onInput={inputHandle}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchHandle: PropTypes.func.isRequired,
};
