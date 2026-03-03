import { formatDate } from '../utils/formatting.js';
import view from '../assets/styles/JobView.module.css';

export default function JobView({ job }) {
  function createWorkPeriod(startDate, endDate) {
    const [start, end] = [
      formatDate(startDate),
      endDate === '' ? 'present' : formatDate(endDate),
    ];
    return (
      <>
        {start}
        {start === end ? '' : ' - '}
        {start === end ? '' : end === 'present' ? <em>present</em> : end}
      </>
    );
  }

  return (
    <>
      <p className={view.workPeriod}>
        {createWorkPeriod(job.startDate, job.endDate)}
      </p>
      <p className={view.company}>
        {`${job.company} - `}
        <em>{job.position}</em>
      </p>
      <p className={view.details}>{job.details}</p>
    </>
  );
}
