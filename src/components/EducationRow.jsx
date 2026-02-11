import styles from '../assets/styles/EducationRow.module.css';

export default function EducationRow() {
  return (
    <div className={styles.row}>
      <>
        <p className={styles.gradYear}>2026</p>
        <p className={styles.school}>School XYZ</p>
        <p className={styles.discipline}>Degree & Discipline</p>
        <button className={styles.saveEdit} type="button">
          Save
        </button>
      </>
      <>
        <select className={styles.select} name="completionYear" defaultValue="">
          <option value="" disabled>
            Graduation year (required)
          </option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={styles.textInput}
          name="school"
          placeholder="School name (required)"
          required
        />
        <input
          type="text"
          className={styles.textInput}
          name="discipline"
          placeholder="Degree & Discipline"
        />
        <button className={styles.saveEdit} type="button">
          Save
        </button>
      </>
    </div>
  );
}

const currentYear = new Date().getFullYear();
const pastYear = currentYear - 100;
const years = [];
for (let year = pastYear; year <= currentYear; year += 1) years.push(year);
