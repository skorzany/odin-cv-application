import { centuryYears } from '../utils/century.js';
import draft from '../assets/styles/SchoolDraft.module.css';

export default function SchoolForm({ school, dispatch }) {
  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
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

  return (
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
        {YEARS.map((year) => (
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
  );
}

const YEARS = centuryYears();
