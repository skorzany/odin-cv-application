import styles from '../assets/styles/EducationRow.module.css';

export default function EducationRow() {
  return (
    <>
      <>
        <select name="completionYear" defaultValue="">
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
          name="school"
          placeholder="School name (required)"
          required
        />
        <input
          type="text"
          name="discipline"
          placeholder="Degree & Discipline"
        />
      </>
      <p>
        <span>2026</span>
        <strong>School XYZ</strong>
        <span>Degree & Discipline</span>
      </p>
      <button type="button">Save</button>
    </>
  );
}

const currentYear = new Date().getFullYear();
const pastYear = currentYear - 100;
const years = [];
for (let year = pastYear; year <= currentYear; year += 1) years.push(year);
