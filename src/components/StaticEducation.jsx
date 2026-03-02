import CustomFieldset from './CustomFieldset.jsx';
import SchoolView from './SchoolView.jsx';
import view from '../assets/styles/ListView.module.css';

export default function StaticEducation({ schools }) {
  return (
    <CustomFieldset legend="Education">
      <ol className={view.list}>
        {schools.map((school) => (
          <li className={view.listItem} key={school.id}>
            <div className={view.row}>
              <SchoolView school={school} />
            </div>
          </li>
        ))}
      </ol>
    </CustomFieldset>
  );
}
