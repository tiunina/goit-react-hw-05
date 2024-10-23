import css from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.currentTarget.movieName.value.trim();

    onSubmit(query);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        placeholder="Enter movie name"
        name="movieName"
        className={css.movieSearch}
      />
      <button type="submit" className={css.btn}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
