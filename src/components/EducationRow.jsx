import { useState, useRef } from 'react';
import styles from '../assets/styles/EducationRow.module.css';

export default function EducationRow() {
  const [isViewing, setIsViewing] = useState(false);
  const [eduData, setEduData] = useState({
    graduation: '',
    school: '',
    discipline: '',
  });
  const rowRef = useRef(null);

  function validate() {
    const gradYear = rowRef.current.querySelector('select');
    const school = rowRef.current.querySelector(`.${styles.textInput}`);

    if (gradYear.value === '') {
      gradYear.setCustomValidity('Please select a year.');
      gradYear.reportValidity();
      return false;
    } else if (school.value.trim() === '') {
      school.setCustomValidity("Please enter school's name.");
      school.reportValidity();
      return false;
    }
    return true;
  }

  function handleClick() {
    if (isViewing) setIsViewing(!isViewing);
    else {
      const allValid = validate();
      if (allValid === true) {
        setEduData({
          ...eduData,
          school: eduData.school.trim(),
          discipline: eduData.discipline.trim(),
        });
        setIsViewing(!isViewing);
      }
    }
  }

  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  }

  return (
    <div className={styles.row} ref={rowRef}>
      {isViewing ? (
        <>
          <p className={styles.gradYear}>{eduData.graduation}</p>
          <p className={styles.school}>{eduData.school}</p>
          <p className={styles.discipline}>{eduData.discipline}</p>
        </>
      ) : (
        <>
          <select
            className={styles.select}
            name="completionYear"
            value={eduData.graduation}
            onChange={(e) =>
              setEduData({ ...eduData, graduation: e.target.value })
            }
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
            className={styles.textInput}
            name="school"
            value={eduData.school}
            placeholder="School name (required)"
            required
            onChange={(e) => setEduData({ ...eduData, school: e.target.value })}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            className={styles.textInput}
            name="discipline"
            value={eduData.discipline}
            placeholder="Degree & Discipline (optional)"
            onChange={(e) =>
              setEduData({ ...eduData, discipline: e.target.value })
            }
          />
        </>
      )}
      <button className={styles.saveEdit} type="button" onClick={handleClick}>
        {isViewing ? 'Edit' : 'Save'}
      </button>
    </div>
  );
}

const currentYear = new Date().getFullYear();
const pastYear = currentYear - 100;
const years = [];
for (let year = pastYear; year <= currentYear; year += 1) years.push(year);
