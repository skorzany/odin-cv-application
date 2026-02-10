import styles from '../assets/styles/ContactInfo.module.css';

export default function ContactInfo() {
  return (
    <fieldset className={styles.contactFieldset}>
      <legend>Contact</legend>
      {/* <>
        <h2 className={styles.name}>John Doe</h2>
        <p className={styles.email}>john.doe@example.com</p>
        <p className={styles.phone}>123 456 789</p>
      </> */}
      <>
        <label className={styles.contactLabel} htmlFor="fname">
          *First name:
        </label>
        <input
          type="text"
          id="fname"
          className={styles.contactInput}
          name="fname"
          placeholder="John"
          required
        />
        <label className={styles.contactLabel} htmlFor="lname">
          *Last name:
        </label>
        <input
          type="text"
          id="lname"
          className={styles.contactInput}
          name="lname"
          placeholder="Doe"
          required
        />
        <label className={styles.contactLabel} htmlFor="email">
          *E-mail:
        </label>
        <input
          type="email"
          id="email"
          className={styles.contactInput}
          name="email"
          placeholder="john.doe@example.com"
          required
        />
        <label className={styles.contactLabel} htmlFor="phone">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          className={styles.contactInput}
          name="phone"
          maxLength="9"
          placeholder="123 456 789"
        />
      </>
      <button type="button" className={styles.saveEdit}>
        Edit
      </button>
    </fieldset>
  );
}
