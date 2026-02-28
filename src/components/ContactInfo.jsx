import { useState } from 'react';
import { formatPhone } from '../utils/formatting.js';
import view from '../assets/styles/ContactView.module.css';
import draft from '../assets/styles/ContactDraft.module.css';

export default function ContactInfo({ fname, lname, email, phone, dispatch }) {
  const [isViewing, setIsViewing] = useState(false);

  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  }

  function handleSave() {
    if (isViewing) setIsViewing(!isViewing);
    else {
      const allValid = validate();
      if (allValid) {
        dispatch({
          type: 'saved_contact',
          firstName: fname,
          lastName: lname,
          email: email,
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
    <fieldset className={view.contactFieldset}>
      <legend>Contact</legend>
      {isViewing ? (
        <>
          <h2 className={view.name}>{`${fname} ${lname}`}</h2>
          <p className={view.email}>{email}</p>
          <p className={view.phone}>{formatPhone(phone)}</p>
        </>
      ) : (
        <>
          <label className={draft.contactLabel} htmlFor="fname">
            *First name:
          </label>
          <input
            type="text"
            id="fname"
            className={draft.contactInput}
            name="fname"
            placeholder="John"
            value={fname}
            required
            onChange={(e) =>
              dispatch({ type: 'changed_fname', firstName: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
          <label className={draft.contactLabel} htmlFor="lname">
            *Last name:
          </label>
          <input
            type="text"
            id="lname"
            className={draft.contactInput}
            name="lname"
            placeholder="Doe"
            value={lname}
            required
            onChange={(e) =>
              dispatch({ type: 'changed_lname', lastName: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
          <label className={draft.contactLabel} htmlFor="email">
            *E-mail:
          </label>
          <input
            type="text"
            id="email"
            className={draft.contactInput}
            name="email"
            placeholder="john.doe@example.com"
            value={email}
            required
            onChange={(e) =>
              dispatch({ type: 'changed_email', email: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
          <label className={draft.contactLabel} htmlFor="phone">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            className={draft.contactInput}
            name="phone"
            maxLength="9"
            placeholder="123 456 789"
            value={phone.split(' ').join('')}
            onChange={(e) =>
              dispatch({ type: 'changed_phone', phone: e.target.value })
            }
          />
        </>
      )}
      <button type="button" className={draft.saveEdit} onClick={handleSave}>
        {isViewing ? 'Edit' : 'Save'}
      </button>
    </fieldset>
  );
}
