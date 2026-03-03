import { useState, useRef } from 'react';
import JobView from './JobView.jsx';
import JobForm from './JobForm.jsx';
import Button from './Button.jsx';
import view from '../assets/styles/ListView.module.css';
import draft from '../assets/styles/JobDraft.module.css';

export default function InteractiveJob({ job, dispatch }) {
  const [isViewing, setIsViewing] = useState(false);
  const jobRef = useRef(null);

  function validate() {
    const [startDate, endDate] = jobRef.current.querySelectorAll(
      `.${draft.dateInput}`,
    );
    const [company, position] = jobRef.current.querySelectorAll(
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
    <div className={view.row} ref={jobRef}>
      {isViewing ? (
        <JobView job={job} />
      ) : (
        <JobForm job={job} dispatch={dispatch} />
      )}
      <Button
        textContent={isViewing ? 'Edit' : 'Preview'}
        className={draft.saveEdit}
        onClick={handleSave}
      />
    </div>
  );
}
