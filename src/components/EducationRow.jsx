import { useState, useRef } from 'react';
import view from '../assets/styles/SchoolView.module.css';
import draft from '../assets/styles/SchoolDraft.module.css';

export default function EducationRow({ school, dispatch }) {
  const [isViewing, setIsViewing] = useState(false);
  const rowRef = useRef(null);

  function validate() {
    const gradYear = rowRef.current.querySelector('select');
    const schoolInput = rowRef.current.querySelector(`.${draft.textInput}`);
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

  function handleChange(e) {
    const [name, value] = [e.target.name, e.target.value];
    const action = { id: school.id };
    switch (name) {
      case 'completionYear':
        dispatch({
          ...action,
          type: 'changed_school_year',
          graduation: value,
        });
        break;
      case 'schoolName':
        dispatch({
          ...action,
          type: 'changed_school_name',
          name: value,
        });
        break;
      case 'discipline':
        dispatch({
          ...action,
          type: 'changed_school_discipline',
          discipline: value,
        });
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
        dispatch({ type: 'saved_school', id: school.id });
        setIsViewing(!isViewing);
      }
    }
  }

  return (
    <div className={view.row} ref={rowRef}>
      {isViewing ? (
        <>
          <p className={view.gradYear}>{school.graduation}</p>
          <p className={view.school}>{school.name}</p>
          <p className={view.discipline}>{school.discipline}</p>
        </>
      ) : (
        <>
          <select
            className={draft.select}
            name="completionYear"
            value={school.graduation}
            required
            onChange={handleChange}
          >
            <option value="" disabled>
              Graduation year (required)
            </option>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
          <input
            type="text"
            className={draft.textInput}
            name="schoolName"
            value={school.name}
            placeholder="School name (required)"
            required
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            className={draft.textInput}
            name="discipline"
            value={school.discipline}
            placeholder="Degree & Discipline (optional)"
            onChange={handleChange}
          />
        </>
      )}
      <button className={draft.saveEdit} type="button" onClick={handleSave}>
        {isViewing ? 'Edit' : 'Save'}
      </button>
    </div>
  );
}

const currentYear = new Date().getFullYear();
const pastYear = currentYear - 100;
const years = [];
for (let year = currentYear; year >= pastYear; year -= 1) years.push(year);
