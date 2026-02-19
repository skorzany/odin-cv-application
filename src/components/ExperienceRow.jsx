import { useState, useRef } from 'react';
import styles from '../assets/styles/ExperienceRow.module.css';

export default function ExperienceRow({ expData, onChange, onSave }) {
  const [isViewing, setIsViewing] = useState(false);
  const rowRef = useRef(null);

  function validate() {
    const [startDate, endDate] = rowRef.current.querySelectorAll(
      `.${styles.dateInput}`,
    );
    const [company, position] = rowRef.current.querySelectorAll(
      `.${styles.textInput}`,
    );
    if (startDate.value === '') {
      startDate.setCustomValidity('Please enter the start date.');
      startDate.reportValidity();
      return false;
    } else if (endDate.value !== '' && endDate.value < startDate.value) {
      endDate.setCustomValidity(
        'End date cannot be smaller than the start date.',
      );
      endDate.reportValidity();
      return false;
    } else if (company.value.trim() === '') {
      company.setCustomValidity("Please enter the company's name.");
      company.reportValidity();
      return false;
    } else if (position.value.trim() === '') {
      position.setCustomValidity("Please enter the job's title.");
      position.reportValidity();
      return false;
    }
    return true;
  }

  function handleClick() {
    if (isViewing) setIsViewing(!isViewing);
    else {
      const allValid = validate();
      if (allValid === true) {
        onSave();
        setIsViewing(!isViewing);
      }
    }
  }

  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  }

  function setMinEndDate(e) {
    const endDateElement = rowRef.current.querySelector(
      'input[name="workEnd"]',
    );
    endDateElement.min = e.target.value;
  }

  function formatDate(dateString) {
    const MONTHS = [
      // abbreviations according to the Yale University Library
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'June',
      'July',
      'Aug.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];
    const dateParts = dateString.split('-');
    return `${MONTHS[Number(dateParts[1]) - 1]} ${dateParts[0]}`;
  }

  return (
    <div className={styles.row} ref={rowRef}>
      {isViewing ? (
        <>
          <p className={styles.workPeriod}>
            {`${formatDate(expData.startDate)} - `}
            {expData.endDate !== '' ? (
              formatDate(expData.endDate)
            ) : (
              <em>present</em>
            )}
          </p>
          <p className={styles.company}>
            {`${expData.company} - `}
            <em>{expData.position}</em>
          </p>
          <p className={styles.details}>{expData.details}</p>
        </>
      ) : (
        <>
          <div className={styles.dates}>
            <span className={styles.dateStart}>
              {'*'}
              <input
                type="date"
                className={styles.dateInput}
                name="workStart"
                value={expData.startDate}
                min={past}
                max={today}
                required
                onChange={(e) => {
                  setMinEndDate(e);
                  onChange(e);
                }}
              />
            </span>
            <span className={styles.dateEnd}>
              {'-'}
              <input
                type="date"
                className={styles.dateInput}
                name="workEnd"
                value={expData.endDate}
                min={past}
                max={today}
                onChange={onChange}
              />
            </span>
          </div>
          <input
            type="text"
            className={styles.textInput}
            name="company"
            value={expData.company}
            placeholder="Company (required)"
            required
            onKeyDown={handleKeyDown}
            onChange={onChange}
          />
          <input
            type="text"
            className={styles.textInput}
            name="position"
            value={expData.position}
            placeholder="Position (required)"
            required
            onKeyDown={handleKeyDown}
            onChange={onChange}
          />
          <textarea
            className={styles.textArea}
            name="details"
            value={expData.details}
            rows="2"
            placeholder="Work details (optional)"
            onChange={onChange}
          ></textarea>
        </>
      )}
      <button className={styles.saveEdit} type="button" onClick={handleClick}>
        {isViewing ? 'Edit' : 'Save'}
      </button>
    </div>
  );
}

const dateObj = new Date();
const today = dateObj.toISOString().split('T')[0];
dateObj.setFullYear(dateObj.getFullYear() - 100);
const past = dateObj.toISOString().split('T')[0];
