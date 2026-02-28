import ExperienceRow from './ExperienceRow.jsx';
import view from '../assets/styles/ListView.module.css';
import draft from '../assets/styles/ListDraft.module.css';

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
      <ol className={view.list}>
        {jobs.map((job) => (
          <li className={view.listItem} key={job.id}>
            <ExperienceRow job={job} dispatch={dispatch} />
            <button
              className={draft.remove}
              type="button"
              onClick={() => removeJob(job.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
      <button className={draft.add} type="button" onClick={addJob}>
        Add new work experience
      </button>
    </fieldset>
  );
}
