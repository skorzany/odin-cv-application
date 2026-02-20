import ExperienceRow from './ExperienceRow.jsx';
import styles from '../assets/styles/ExperienceInfo.module.css';

let freeId = 0;

export default function ExperienceInfo({ state, setter }) {
  function addJob() {
    const newJob = {
      startDate: '',
      endDate: '',
      company: '',
      position: '',
      details: '',
      id: freeId++,
    };
    setter({ ...state, jobs: [...state.jobs, newJob] });
  }

  function handleChange(e, id) {
    const oldData = state.jobs.find((job) => job.id === id);
    const idx = state.jobs.indexOf(oldData);
    const name = e.target.name;
    const value = e.target.value;
    let newData;
    switch (name) {
      case 'workStart':
        newData = { ...oldData, startDate: value };
        break;
      case 'workEnd':
        newData = { ...oldData, endDate: value };
        break;
      case 'company':
        newData = { ...oldData, company: value };
        break;
      case 'position':
        newData = { ...oldData, position: value };
        break;
      case 'details':
        newData = { ...oldData, details: value };
        break;
    }
    setter({
      ...state,
      jobs: [
        ...state.jobs.slice(0, idx),
        newData,
        ...state.jobs.slice(idx + 1),
      ],
    });
  }

  function handleSave(id) {
    const oldData = state.jobs.find((job) => job.id === id);
    const idx = state.jobs.indexOf(oldData);
    const newData = {
      ...oldData,
      company: oldData.company.trim(),
      position: oldData.position.trim(),
      details: oldData.details.trim(),
    };
    setter({
      ...state,
      jobs: [
        ...state.jobs.slice(0, idx),
        newData,
        ...state.jobs.slice(idx + 1),
      ],
    });
  }

  return (
    <fieldset>
      <legend>Work experience</legend>
      <ol className={styles.list}>
        {state.jobs.map((job) => (
          <li className={styles.listItem} key={job.id}>
            <ExperienceRow
              expData={job}
              onChange={(e) => handleChange(e, job.id)}
              onSave={() => handleSave(job.id)}
            />
            <button
              className={styles.remove}
              type="button"
              onClick={() =>
                setter({
                  ...state,
                  jobs: state.jobs.filter((obj) => obj.id !== job.id),
                })
              }
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
