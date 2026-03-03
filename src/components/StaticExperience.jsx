import CustomFieldset from './CustomFieldset.jsx';
import JobView from './JobView.jsx';
import view from '../assets/styles/ListView.module.css';

export default function StaticExperience({ jobs }) {
  return (
    <CustomFieldset legend="Work experience">
      <ol className={view.list}>
        {jobs.map((job) => (
          <li className={view.listItem} key={job.id}>
            <div className={view.row}>
              <JobView job={job} />
            </div>
          </li>
        ))}
      </ol>
    </CustomFieldset>
  );
}
