import { useState } from 'react';
import styles from '../assets/styles/ContactInfo.module.css';

export default function ContactInfo({ state, setter }) {
  const [isViewing, setIsViewing] = useState(false);

  function formatName(name) {
    let words = name.trim().split(/ - |-/); // in my country some people have 'Two-Word' names and surnames
    words = words.map(
      (word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase(),
    );
    return words.join('-');
  }

  function formatEmail(email) {
    return email.trim().toLowerCase();
  }

  function formatPhone(phone) {
    return (
      phone && `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`
    );
  }

  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  }

  function handleClick() {
    if (isViewing) setIsViewing(!isViewing);
    else {
      const allValid = validate();
      if (allValid) {
        setter({
          ...state,
          firstName: formatName(state.firstName),
          lastName: formatName(state.lastName),
          email: formatEmail(state.email),
        });
        setIsViewing(!isViewing);
      }
    }
  }

  function validate() {
    const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [fName, lName, email] = ['fname', 'lname', 'email'].map((id) =>
      document.getElementById(id),
    );

    if (fName.value.trim().length === 0) {
      fName.setCustomValidity('Please enter your name.');
      fName.reportValidity();
      return false;
    } else if (lName.value.trim().length === 0) {
      lName.setCustomValidity('Please enter your surname.');
      lName.reportValidity();
      return false;
    } else if (!EMAIL.test(email.value.trim())) {
      email.setCustomValidity('Please enter a valid e-mail.');
      email.reportValidity();
      return false;
    }
    return true;
  }

  return (
    <fieldset className={styles.contactFieldset}>
      <legend>Contact</legend>
      {isViewing ? (
        <>
          <h2
            className={styles.name}
          >{`${state.firstName} ${state.lastName}`}</h2>
          <p className={styles.email}>{state.email}</p>
          <p className={styles.phone}>{formatPhone(state.phone)}</p>
        </>
      ) : (
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
            value={state.firstName}
            required
            onChange={(e) => setter({ ...state, firstName: e.target.value })}
            onKeyDown={handleKeyDown}
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
            value={state.lastName}
            required
            onChange={(e) => setter({ ...state, lastName: e.target.value })}
            onKeyDown={handleKeyDown}
          />
          <label className={styles.contactLabel} htmlFor="email">
            *E-mail:
          </label>
          <input
            type="text"
            id="email"
            className={styles.contactInput}
            name="email"
            placeholder="john.doe@example.com"
            value={state.email}
            required
            onChange={(e) => setter({ ...state, email: e.target.value })}
            onKeyDown={handleKeyDown}
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
            value={state.phone.split(' ').join('')}
            onChange={(e) => setter({ ...state, phone: e.target.value })}
          />
        </>
      )}
      <button type="button" className={styles.saveEdit} onClick={handleClick}>
        {isViewing ? 'Edit' : 'Save'}
      </button>
    </fieldset>
  );
}
