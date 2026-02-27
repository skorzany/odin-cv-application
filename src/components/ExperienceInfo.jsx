import ExperienceRow from './ExperienceRow.jsx';
import styles from '../assets/styles/ExperienceInfo.module.css';

export default function ExperienceInfo({ jobs, dispatch }) {
  function addJob() {
    dispatch({ type: 'added_job' });
  }

  function removeJob(id) {
    dispatch({ type: 'removed_job', id });
  }

  return (
    <fieldset>
      <legend>Work experience</legend>
      <ol className={styles.list}>
        {jobs.map((job) => (
          <li className={styles.listItem} key={job.id}>
            <ExperienceRow job={job} dispatch={dispatch} />
            <button
              className={styles.remove}
              type="button"
              onClick={() => removeJob(job.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
      <button className={styles.add} type="button" onClick={addJob}>
        Add new work experience
      </button>
    </fieldset>
  );
}
