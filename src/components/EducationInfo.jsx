import { useState } from 'react';
import EducationRow from './EducationRow.jsx';
import styles from '../assets/styles/EducationInfo.module.css';

const TEMPLATE = { graduation: '', school: '', discipline: '' };
let freeId = 0;

export default function EducationInfo() {
  const [schools, setSchools] = useState([]);

  function addSchool() {
    const newSchool = { ...TEMPLATE, id: freeId++ };
    setSchools([...schools, newSchool]);
  }

  function handleChange(e, id) {
    const oldData = schools.find((school) => school.id === id);
    const idx = schools.indexOf(oldData);
    const name = e.target.name;
    const value = e.target.value;
    let newData;
    switch (name) {
      case 'completionYear':
        newData = { ...oldData, graduation: value };
        break;
      case 'school':
        newData = { ...oldData, school: value };
        break;
      case 'discipline':
        newData = { ...oldData, discipline: value };
        break;
    }
    setSchools([...schools.slice(0, idx), newData, ...schools.slice(idx + 1)]);
  }

  function handleSave(id) {
    const oldData = schools.find((school) => school.id === id);
    const idx = schools.indexOf(oldData);
    const newData = {
      ...oldData,
      school: oldData.school.trim(),
      discipline: oldData.discipline.trim(),
    };
    setSchools([...schools.slice(0, idx), newData, ...schools.slice(idx + 1)]);
  }

  return (
    <fieldset>
      <legend>Education</legend>
      <ol className={styles.list}>
        {schools.map((school) => (
          <li className={styles.listItem} key={school.id}>
            <EducationRow
              eduData={school}
              onChange={(e) => handleChange(e, school.id)}
              onSave={() => handleSave(school.id)}
            />
            <button
              className={styles.remove}
              type="button"
              onClick={() =>
                setSchools(schools.filter((obj) => obj.id !== school.id))
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
      <button className={styles.add} type="button" onClick={addSchool}>
        Add new education
      </button>
    </fieldset>
  );
}
