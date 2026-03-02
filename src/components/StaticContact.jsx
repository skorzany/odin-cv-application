import CustomFieldset from './CustomFieldset.jsx';
import ContactView from './ContactView.jsx';
import view from '../assets/styles/ContactView.module.css';

export default function StaticContact({ fname, lname, email, phone }) {
  return (
    <CustomFieldset legend="Contact" wrapperClass={view.contactFieldset}>
      <ContactView fname={fname} lname={lname} email={email} phone={phone} />
    </CustomFieldset>
  );
}
