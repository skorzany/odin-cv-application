import { useRef } from 'react';
import { centuryDays } from '../utils/century.js';
import draft from '../assets/styles/JobDraft.module.css';

export default function JobForm({ job, dispatch }) {
  const datesRef = useRef(null);

  function getStoredDate(fallback) {
    const storedDates = sessionStorage.getItem('stored_dates');
    return storedDates === null ? fallback : JSON.parse(storedDates)[job.id];
  }

  function setStoredDate(e) {
    const storedDates =
      JSON.parse(sessionStorage.getItem('stored_dates')) ?? {};
    storedDates[job.id] = e.target.value;
    sessionStorage.setItem('stored_dates', JSON.stringify(storedDates));
  }

  function changeMinEndDate(e) {
    const endDateElement = datesRef.current.querySelector(
      'input[name="workEnd"]',
    );
    endDateElement.min = e.target.value;
  }

  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  }

  function handleChange(e) {
    const [name, value] = [e.target.name, e.target.value];
    const action = { id: job.id };
    switch (name) {
      case 'workStart':
        dispatch({ ...action, type: 'changed_job_start', startDate: value });
        break;
      case 'workEnd':
        dispatch({ ...action, type: 'changed_job_end', endDate: value });
        break;
      case 'company':
        dispatch({ ...action, type: 'changed_job_company', company: value });
        break;
      case 'position':
        dispatch({ ...action, type: 'changed_job_position', position: value });
        break;
      case 'details':
        dispatch({ ...action, type: 'changed_job_details', details: value });
        break;
      default:
        throw Error('Unknown name:', name);
    }
  }

  return (
    <>
      <div className={draft.dates} ref={datesRef}>
        <span className={draft.dateStart}>
          {'*'}
          <input
            type="date"
            className={draft.dateInput}
            name="workStart"
            value={job.startDate}
            min={past}
            max={today}
            required
            onChange={(e) => {
              changeMinEndDate(e);
              setStoredDate(e);
              handleChange(e);
            }}
          />
        </span>
        <span className={draft.dateEnd}>
          {'-'}
          <input
            type="date"
            className={draft.dateInput}
            name="workEnd"
            value={job.endDate}
            min={getStoredDate(past)}
            max={today}
            onChange={handleChange}
          />
        </span>
      </div>
      <input
        type="text"
        className={draft.textInput}
        name="company"
        value={job.company}
        placeholder="Company (required)"
        required
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <input
        type="text"
        className={draft.textInput}
        name="position"
        value={job.position}
        placeholder="Position (required)"
        required
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <textarea
        className={draft.textArea}
        name="details"
        value={job.details}
        rows="2"
        placeholder="Work details (optional)"
        onChange={handleChange}
      ></textarea>
    </>
  );
}

const { today, past } = centuryDays();
