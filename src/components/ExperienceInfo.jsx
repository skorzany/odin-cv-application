import ExperienceRow from './ExperienceRow.jsx';
import styles from '../assets/styles/ExperienceInfo.module.css';

export default function ExperienceInfo() {
  return (
    <fieldset>
      <legend>Work experience</legend>
      <ol className={styles.list}>
        <li className={styles.listItem}>
          <ExperienceRow />
          <button className={styles.remove} type="button">
            Remove
          </button>
        </li>
      </ol>
      <button className={styles.add} type="button">
        Add new work experience
      </button>
    </fieldset>
  );
}
