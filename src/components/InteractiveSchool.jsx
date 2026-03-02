import { useState, useRef } from 'react';
import SchoolView from './SchoolView.jsx';
import SchoolForm from './SchoolForm.jsx';
import Button from './Button.jsx';
import view from '../assets/styles/ListView.module.css';
import draft from '../assets/styles/SchoolDraft.module.css';

export default function InteractiveSchool({ school, dispatch }) {
  const [isViewing, setIsViewing] = useState(false);
  const schoolRef = useRef(null);

  function validate() {
    const gradYear = schoolRef.current.querySelector('select');
    const schoolInput = schoolRef.current.querySelector(`.${draft.textInput}`);
    if (gradYear.value === '') {
      gradYear.setCustomValidity('Please select a year.');
      gradYear.reportValidity();
      return false;
    } else if (schoolInput.value.trim() === '') {
      schoolInput.setCustomValidity("Please enter school's name.");
      schoolInput.reportValidity();
      return false;
    }
    return true;
  }

  function handleSave() {
    if (isViewing) setIsViewing(!isViewing);
    else {
      const allValid = validate();
      if (allValid === true) {
        dispatch({ type: 'saved_school', id: school.id });
        setIsViewing(!isViewing);
      }
    }
  }

  return (
    <div className={view.row} ref={schoolRef}>
      {isViewing ? (
        <SchoolView school={school} />
      ) : (
        <SchoolForm school={school} dispatch={dispatch} />
      )}
      <Button
        textContent={isViewing ? 'Edit' : 'Preview'}
        className={draft.saveEdit}
        onClick={handleSave}
      />
    </div>
  );
}
