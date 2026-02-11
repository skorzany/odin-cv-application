import EducationRow from './EducationRow.jsx';
import styles from '../assets/styles/EducationInfo.module.css';

export default function EducationInfo() {
  return (
    <fieldset>
      <legend>Education</legend>
      <ol className={styles.list}>
        <li className={styles.listItem}>
          <EducationRow />
          <button className={styles.remove} type="button">
            Remove
          </button>
        </li>
      </ol>
      <button className={styles.add} type="button">
        Add new education
      </button>
    </fieldset>
  );
}
