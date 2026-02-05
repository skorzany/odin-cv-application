import styles from '../assets/styles/ContactInfo.module.css';

export default function ContactInfo() {
  return (
    <fieldset>
      <legend>Contact</legend>
      <>
        <label>
          *First name:
          <input type="text" name="fname" placeholder="John" required />
        </label>
        <label>
          *Last name:
          <input type="text" name="lname" placeholder="Doe" required />
        </label>
        <label>
          *E-mail:
          <input
            type="email"
            name="email"
            placeholder="john.doe@example.com"
            required
          />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" placeholder="123 456 789" />
        </label>
      </>
      <>
        <h2>John Doe</h2>
        <p>john.doe@example.com</p>
        <p>123 456 789</p>
      </>
      <button type="button">Edit</button>
    </fieldset>
  );
}
