import styles from '../assets/styles/ExperienceRow.module.css';

export default function ExperienceRow() {
  return (
    <div className={styles.row}>
      <>
        <p className={styles.workPeriod}>01.01.2005 - 01.01.2007</p>
        <p className={styles.company}>
          Company name - <em>Position name</em>
        </p>
        <p className={styles.details}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          eos fugit odio adipisci ad quasi distinctio in id nobis ipsam
          perspiciatis, voluptates cumque debitis? Optio ipsa reiciendis
          assumenda sed reprehenderit.
        </p>
        <button className={styles.saveEdit} type="button">
          Save
        </button>
      </>
      <>
        <div className={styles.dates}>
          <span className={styles.dateStart}>
            {'*'}
            <input
              type="date"
              className={styles.dateInput}
              name="workStart"
              min={past}
              max={today}
              required
            />
          </span>
          <span className={styles.dateEnd}>
            {'-'}
            <input
              type="date"
              className={styles.dateInput}
              name="workEnd"
              min={past}
              max={today}
            />
          </span>
        </div>
        <input
          type="text"
          className={styles.textInput}
          name="company"
          placeholder="Company (required)"
          required
        />
        <input
          type="text"
          className={styles.textInput}
          name="position"
          placeholder="Position (required)"
          required
        />
        <textarea
          className={styles.textArea}
          name="details"
          rows="2"
          placeholder="Work details"
        ></textarea>
        <button className={styles.saveEdit} type="button">
          Save
        </button>
      </>
    </div>
  );
}

const dateObj = new Date();
const today = dateObj.toISOString().split('T')[0];
dateObj.setFullYear(dateObj.getFullYear() - 100);
const past = dateObj.toISOString().split('T')[0];
