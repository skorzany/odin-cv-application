import ContactInfo from './components/ContactInfo.jsx';
import EducationInfo from './components/EducationInfo.jsx';
import ExperienceInfo from './components/ExperienceInfo.jsx';
import './assets/styles/reset.css';
import './assets/styles/App.css';

export default function App() {
  return (
    <>
      <h1>Curriculum Vitae</h1>
      <form>
        <ContactInfo />
        <EducationInfo />
        <ExperienceInfo />
        <button type="submit">Submit</button>
      </form>
      <footer>
        <a href="https://github.com/skorzany/">&copy; 2026 Skorzany</a>
      </footer>
    </>
  );
}
