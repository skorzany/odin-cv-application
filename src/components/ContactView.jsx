import { formatPhone } from '../utils/formatting.js';
import view from '../assets/styles/ContactView.module.css';

export default function ContactView({ fname, lname, email, phone }) {
  return (
    <>
      <h2 className={view.name}>{`${fname} ${lname}`}</h2>
      <p className={view.email}>{email}</p>
      <p className={view.phone}>{formatPhone(phone)}</p>
    </>
  );
}
