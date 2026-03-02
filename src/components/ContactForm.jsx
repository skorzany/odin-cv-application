import draft from '../assets/styles/ContactDraft.module.css';

export default function ContactForm({ fname, lname, email, phone, dispatch }) {
  function handleKeyDown(e) {
    e.target.setCustomValidity('');
    e.target.reportValidity();
  }

  return (
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
  );
}
