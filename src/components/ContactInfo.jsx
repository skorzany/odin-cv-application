import { useState } from 'react';
import styles from '../assets/styles/ContactInfo.module.css';

export default function ContactInfo() {
  const [isViewing, setIsViewing] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

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
        setContactData({
          ...contactData,
          firstName: formatName(contactData.firstName),
          lastName: formatName(contactData.lastName),
          email: formatEmail(contactData.email),
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
          >{`${contactData.firstName} ${contactData.lastName}`}</h2>
          <p className={styles.email}>{contactData.email}</p>
          <p className={styles.phone}>{formatPhone(contactData.phone)}</p>
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
            value={contactData.firstName}
            required
            onChange={(e) =>
              setContactData({ ...contactData, firstName: e.target.value })
            }
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
            value={contactData.lastName}
            required
            onChange={(e) =>
              setContactData({ ...contactData, lastName: e.target.value })
            }
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
            value={contactData.email}
            required
            onChange={(e) =>
              setContactData({ ...contactData, email: e.target.value })
            }
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
            value={contactData.phone.split(' ').join('')}
            onChange={(e) =>
              setContactData({ ...contactData, phone: e.target.value })
            }
          />
        </>
      )}
      <button type="button" className={styles.saveEdit} onClick={handleClick}>
        {isViewing ? 'Edit' : 'Save'}
      </button>
    </fieldset>
  );
}
