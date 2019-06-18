import React from 'react';
import PropTypes from 'prop-types';
import SortOptions from './sortOptions.jsx';
import FilterButton from './FilterButton.jsx';
import { sortCaretDown, sortCaretUp } from '../styles/svgs/svgs.jsx';
import styles from '../styles/styles.module.css';

function Sorting(props) {
  const { tags } = props;
  const { filters } = props;
  const { ratingFilter } = props;
  const { choosingSort } = props;
  const { sortBy } = props;
  const { options } = props;
  const { handleSortClick } = props;
  const { handleSortOptionClick } = props;
  const { handleFilterClick } = props;
  const { unFilterByRating } = props;

  const filterTags = Object.keys(tags).map((tag, index) => {
    if (filters.storage[tag]) {
      return <FilterButton tag={tag} key={index} count={tags[tag][1]} classString={styles.filterSelected} checked handleFilterClick={handleFilterClick} />;
    }
    return <FilterButton tag={tag} key={index} count={tags[tag][1]} classString={styles.filterButton} handleFilterClick={handleFilterClick} />;
  });

  return (
    <div className={styles.sortingPanel}>
      <h4>Sort by</h4>
      <div className={styles.sortArea}>
        <div className={styles.sortDropdown} onClick={handleSortClick}>
          <span className={styles.sorterName}>{sortBy}</span>
          {choosingSort
            ? sortCaretUp
            : sortCaretDown}
        </div>
        <div className={styles.optionsContainer}>
          {choosingSort
            ? <SortOptions options={options} sortBy={sortBy} handleSortOptionClick={handleSortOptionClick} />
            : null}
        </div>
      </div>
      <h4>Filters</h4>
      <div className={styles.filters}>
        {ratingFilter
          ? <FilterButton tag={`${ratingFilter} stars`} classString={styles.filterSelected} checked handleFilterClick={unFilterByRating} />
          : null}
        {filterTags}
      </div>
    </div>
  );
}

Sorting.propTypes = {
  tags: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  ratingFilter: PropTypes.number,
  choosingSort: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleSortClick: PropTypes.func.isRequired,
  handleSortOptionClick: PropTypes.func.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  unFilterByRating: PropTypes.func.isRequired
};

Sorting.defaultProps = {
  ratingFilter: null
};

export default Sorting;
