import { useState } from 'react';
import CustomFieldset from './CustomFieldset.jsx';
import ContactView from './ContactView.jsx';
import ContactForm from './ContactForm.jsx';
import Button from './Button.jsx';
import view from '../assets/styles/ContactView.module.css';
import draft from '../assets/styles/ContactDraft.module.css';

export default function InteractiveContact({
  fname,
  lname,
  email,
  phone,
  dispatch,
}) {
  const [isViewing, setIsViewing] = useState(false);

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
    <CustomFieldset legend="Contact" wrapperClass={view.contactFieldset}>
      {isViewing ? (
        <ContactView fname={fname} lname={lname} email={email} phone={phone} />
      ) : (
        <ContactForm
          fname={fname}
          lname={lname}
          email={email}
          phone={phone}
          dispatch={dispatch}
        />
      )}
      <Button
        textContent={isViewing ? 'Edit' : 'Preview'}
        className={draft.saveEdit}
        onClick={handleSave}
      />
    </CustomFieldset>
  );
}
