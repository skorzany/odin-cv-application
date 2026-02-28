import EducationRow from './EducationRow.jsx';
import view from '../assets/styles/ListView.module.css';
import draft from '../assets/styles/ListDraft.module.css';

export default function EducationInfo({ schools, dispatch }) {
  function addSchool() {
    dispatch({ type: 'added_school' });
  }

  function removeSchool(id) {
    dispatch({ type: 'removed_school', id });
  }

  return (
    <fieldset>
      <legend>Education</legend>
      <ol className={view.list}>
        {schools.map((school) => (
          <li className={view.listItem} key={school.id}>
            <EducationRow school={school} dispatch={dispatch} />
            <button
              className={draft.remove}
              type="button"
              onClick={() => removeSchool(school.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
      <button className={draft.add} type="button" onClick={addSchool}>
        Add new education
      </button>
    </fieldset>
  );
}
