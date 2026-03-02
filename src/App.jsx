import { useReducer } from 'react';
import { initialState, personReducer } from './reducers/personReducer.js';
import InteractiveContact from './components/InteractiveContact.jsx';
import InteractiveEducation from './components/InteractiveEducation.jsx';
import ExperienceInfo from './components/ExperienceInfo.jsx';
import './assets/styles/reset.css';
import './assets/styles/App.css';

export default function App() {
  const [personData, dispatch] = useReducer(personReducer, initialState);

  return (
    <>
      <h1>Curriculum Vitae</h1>
      <form>
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
        <ExperienceInfo jobs={personData.jobs} dispatch={dispatch} />
        <button type="submit">Submit</button>
      </form>
      <footer>
        <a href="https://github.com/skorzany/">&copy; 2026 Skorzany</a>
      </footer>
    </>
  );
}
