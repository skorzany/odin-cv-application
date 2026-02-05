import ExperienceRow from './ExperienceRow.jsx';
import styles from '../assets/styles/ExperienceInfo.module.css';

export default function ExperienceInfo() {
  return (
    <fieldset>
      <legend>Work experience</legend>
      <ol>
        <li>
          <ExperienceRow />
          <button type="button">Remove</button>
        </li>
      </ol>
      <button>Add new work experience</button>
    </fieldset>
  );
}
