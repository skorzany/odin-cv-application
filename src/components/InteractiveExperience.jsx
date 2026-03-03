import CustomFieldset from './CustomFieldset.jsx';
import InteractiveJob from './InteractiveJob.jsx';
import Button from './Button.jsx';
import view from '../assets/styles/ListView.module.css';
import draft from '../assets/styles/ListDraft.module.css';

export default function InteractiveExperience({ jobs, dispatch }) {
  function addJob() {
    dispatch({ type: 'added_job' });
  }

  function removeJob(id) {
    dispatch({ type: 'removed_job', id });
  }

  return (
    <CustomFieldset legend="Work experience">
      <ol className={view.list}>
        {jobs.map((job) => (
          <li className={view.listItem} key={job.id}>
            <InteractiveJob job={job} dispatch={dispatch} />
            <Button
              textContent="Remove"
              className={draft.remove}
              onClick={() => removeJob(job.id)}
            />
          </li>
        ))}
      </ol>
      <Button
        textContent="Add new work experience"
        className={draft.add}
        onClick={addJob}
      />
    </CustomFieldset>
  );
}
