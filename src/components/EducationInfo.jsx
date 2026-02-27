import EducationRow from './EducationRow.jsx';
import styles from '../assets/styles/EducationInfo.module.css';

export default function EducationInfo({ schools, dispatch }) {
  function addSchool() {
    dispatch({ type: 'added_school' });
  }

  function removeSchool(id) {
    dispatch({ type: 'removed_school', id });
  }

  return (
    <fieldset>
      <legend>Education</legend>
      <ol className={styles.list}>
        {schools.map((school) => (
          <li className={styles.listItem} key={school.id}>
            <EducationRow school={school} dispatch={dispatch} />
            <button
              className={styles.remove}
              type="button"
              onClick={() => removeSchool(school.id)}
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
