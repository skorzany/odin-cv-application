import { useState } from 'react';
import ExperienceRow from './ExperienceRow.jsx';
import styles from '../assets/styles/ExperienceInfo.module.css';

const TEMPLATE = {
  startDate: '',
  endDate: '',
  company: '',
  position: '',
  details: '',
};
let freeId = 0;

export default function ExperienceInfo() {
  const [jobs, setJobs] = useState([]);

  function addJob() {
    const newJob = { ...TEMPLATE, id: freeId++ };
    setJobs([...jobs, newJob]);
  }

  function handleChange(e, id) {
    const oldData = jobs.find((job) => job.id === id);
    const idx = jobs.indexOf(oldData);
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
    setJobs([...jobs.slice(0, idx), newData, ...jobs.slice(idx + 1)]);
  }

  function handleSave(id) {
    const oldData = jobs.find((job) => job.id === id);
    const idx = jobs.indexOf(oldData);
    const newData = {
      ...oldData,
      company: oldData.company.trim(),
      position: oldData.position.trim(),
      details: oldData.details.trim(),
    };
    setJobs([...jobs.slice(0, idx), newData, ...jobs.slice(idx + 1)]);
  }

  return (
    <fieldset>
      <legend>Work experience</legend>
      <ol className={styles.list}>
        {jobs.map((job) => (
          <li className={styles.listItem} key={job.id}>
            <ExperienceRow
              expData={job}
              onChange={(e) => handleChange(e, job.id)}
              onSave={() => handleSave(job.id)}
            />
            <button
              className={styles.remove}
              type="button"
              onClick={() => setJobs(jobs.filter((obj) => obj.id !== job.id))}
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
