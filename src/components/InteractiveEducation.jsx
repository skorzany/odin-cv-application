import CustomFieldset from './CustomFieldset.jsx';
import InteractiveSchool from './InteractiveSchool.jsx';
import Button from './Button.jsx';
import view from '../assets/styles/ListView.module.css';
import draft from '../assets/styles/ListDraft.module.css';

export default function InteractiveEducation({ schools, dispatch }) {
  function addSchool() {
    dispatch({ type: 'added_school' });
  }

  function removeSchool(id) {
    dispatch({ type: 'removed_school', id });
  }

  return (
    <CustomFieldset legend="Education">
      <ol className={view.list}>
        {schools.map((school) => (
          <li className={view.listItem} key={school.id}>
            <InteractiveSchool school={school} dispatch={dispatch} />
            <Button
              textContent="Remove"
              className={draft.remove}
              onClick={() => removeSchool(school.id)}
            />
          </li>
        ))}
      </ol>
      <Button
        textContent="Add new school"
        className={draft.add}
        onClick={addSchool}
      />
    </CustomFieldset>
  );
}
