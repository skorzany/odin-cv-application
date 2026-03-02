import view from '../assets/styles/SchoolView.module.css';

export default function SchoolView({ school }) {
  return (
    <>
      <p className={view.gradYear}>{school.graduation}</p>
      <p className={view.school}>{school.name}</p>
      <p className={view.discipline}>{school.discipline}</p>
    </>
  );
}
