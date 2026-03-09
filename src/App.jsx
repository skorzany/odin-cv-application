import { useReducer, useState, useEffect } from 'react';
import { initialState, personReducer } from './reducers/personReducer.js';
import StaticContact from './components/StaticContact.jsx';
import InteractiveContact from './components/InteractiveContact.jsx';
import StaticEducation from './components/StaticEducation.jsx';
import InteractiveEducation from './components/InteractiveEducation.jsx';
import StaticExperience from './components/StaticExperience.jsx';
import InteractiveExperience from './components/InteractiveExperience.jsx';
import './assets/styles/reset.css';
import './assets/styles/App.css';

export default function App() {
  const [personData, dispatch] = useReducer(personReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handlePageRefresh = () => sessionStorage.removeItem('stored_dates');
    window.addEventListener('beforeunload', handlePageRefresh);
    return () => window.removeEventListener('beforeUnload', handlePageRefresh);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const allGood = validate();
    if (allGood) {
      dispatch({ type: 'submit' });
      setIsSubmitted(true);
      alert("Here's your clean CV!");
    }
  }

  function validate() {
    const requiredFields = document.querySelectorAll('[required]');
    for (const field of requiredFields) {
      let isValid = field.checkValidity() && field.value.trim() !== '';
      if (field.id === 'email') {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        isValid = regex.test(field.value);
      }
      if (!isValid) {
        field.setCustomValidity('Input is empty or has invalid value.');
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  return (
    <>
      <h1>Curriculum Vitae</h1>
      {isSubmitted ? (
        <div className="form">
          <StaticContact
            fname={personData.firstName}
            lname={personData.lastName}
            email={personData.email}
            phone={personData.phone}
          />
          {personData.schools.length !== 0 && (
            <StaticEducation schools={personData.schools} />
          )}
          {personData.jobs.length !== 0 && (
            <StaticExperience jobs={personData.jobs} />
          )}
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <InteractiveContact
            fname={personData.firstName}
            lname={personData.lastName}
            email={personData.email}
            phone={personData.phone}
            dispatch={dispatch}
          />
          <InteractiveEducation
            schools={personData.schools}
            dispatch={dispatch}
          />
          <InteractiveExperience jobs={personData.jobs} dispatch={dispatch} />
          <button type="submit">Submit</button>
        </form>
      )}
      <footer>
        <a href="https://github.com/skorzany/">&copy; 2026 Skorzany</a>
      </footer>
    </>
  );
}
