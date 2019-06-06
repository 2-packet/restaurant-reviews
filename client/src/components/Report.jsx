import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/styles.module.css';

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(event) {
    const { handleReportClear } = this.props;
    if (event.target.className === styles.cancel) {
      handleReportClear();
      return;
    }
    if (this.reportPopup.contains(event.target)) {
      return;
    }
    handleReportClear();
  }

  render() {
    return (
      <div ref={(node) => { this.reportPopup = node; }} className={styles.reportPopupContainer}>
        <div className={styles.reportPopup}>
          <h3>Report this review as inappropriate?</h3>
          <div className={styles.reportCenter}>
            <p>If you believe this review should be removed from FreeSeats, please let us know and someone will investigate.</p>
            <textarea placeholder="Tell us why you find the review inappropriate." />
          </div>
          <div className={styles.reportButtons}>
            <button type="submit" className={styles.reportButton}>Report</button>
            <button type="button" className={styles.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

Report.propTypes = {
  handleReportClear: PropTypes.func.isRequired
};

export default Report;
