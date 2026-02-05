import EducationRow from './EducationRow.jsx';
import styles from '../assets/styles/EducationInfo.module.css';

export default function EducationInfo() {
  return (
    <fieldset>
      <legend>Education</legend>
      <ol>
        <li>
          <EducationRow />
          <button type="button">Remove</button>
        </li>
      </ol>
      <button>Add new education</button>
    </fieldset>
  );
}
