import styles from '../assets/styles/ExperienceRow.module.css';

export default function ExperienceRow() {
  return (
    <>
      <>
        {'*'}
        <input type="date" name="workStart" min={past} max={today} required />
        {' - '}
        <input type="date" name="workEnd" min={past} max={today} />
        <input
          type="text"
          name="company"
          placeholder="Company (required)"
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position (required)"
          required
        />
        <textarea name="details" rows="3" placeholder="Work details"></textarea>
      </>
      <p>
        <span>2005 - 2007</span>
        <strong>Company name</strong>
        <strong>Position name</strong>
        <span>Lorem ipsum dolor sit amet...</span>
      </p>
      <button type="button">Save</button>
    </>
  );
}

const dateObj = new Date();
const today = dateObj.toISOString().split('T')[0];
dateObj.setFullYear(dateObj.getFullYear() - 100);
const past = dateObj.toISOString().split('T')[0];
