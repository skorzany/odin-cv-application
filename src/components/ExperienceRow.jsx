import { useState, useRef } from 'react';
import { formatDate } from '../utils/formatting.js';
import view from '../assets/styles/JobView.module.css';
import draft from '../assets/styles/JobDraft.module.css';

export default function ExperienceRow({ job, dispatch }) {
  const [isViewing, setIsViewing] = useState(false);
  const rowRef = useRef(null);

  function setMinEndDate(e) {
    const endDateElement = rowRef.current.querySelector(
      'input[name="workEnd"]',
    );
    endDateElement.min = e.target.value;
  }

  function validate() {
    const [startDate, endDate] = rowRef.current.querySelectorAll(
      `.${draft.dateInput}`,
    );
    const [company, position] = rowRef.current.querySelectorAll(
      `.${draft.textInput}`,
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

  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  }

  function handleSave() {
    if (isViewing) setIsViewing(!isViewing);
    else {
      const allValid = validate();
      if (allValid === true) {
        dispatch({ type: 'saved_job', id: job.id });
        setIsViewing(!isViewing);
      }
    }
  }

  return (
    <div className={view.row} ref={rowRef}>
      {isViewing ? (
        <>
          <p className={view.workPeriod}>
            {`${formatDate(job.startDate)} - `}
            {job.endDate !== '' ? formatDate(job.endDate) : <em>present</em>}
          </p>
          <p className={view.company}>
            {`${job.company} - `}
            <em>{job.position}</em>
          </p>
          <p className={view.details}>{job.details}</p>
        </>
      ) : (
        <>
          <div className={draft.dates}>
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
                  setMinEndDate(e);
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
                min={past}
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
      )}
      <button className={draft.saveEdit} type="button" onClick={handleSave}>
        {isViewing ? 'Edit' : 'Save'}
      </button>
    </div>
  );
}

const dateObj = new Date();
const today = dateObj.toISOString().split('T')[0];
dateObj.setFullYear(dateObj.getFullYear() - 100);
const past = dateObj.toISOString().split('T')[0];
