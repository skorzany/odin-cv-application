import { formatName, formatEmail } from '../utils/formatting.js';
import { schoolComparisonFn, jobComparisonFn } from '../utils/sorting.js';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  schools: [],
  jobs: [],
};

const SCHOOL_TEMPLATE = {
  graduation: '',
  name: '',
  discipline: '',
};

const JOB_TEMPLATE = {
  startDate: '',
  endDate: '',
  company: '',
  position: '',
  details: '',
};

let [schoolId, jobId] = [0, 0];

function personReducer(state, action) {
  switch (action.type) {
    // contact-specific data
    case 'saved_contact': {
      return {
        ...state,
        firstName: formatName(action.firstName),
        lastName: formatName(action.lastName),
        email: formatEmail(action.email),
      };
    }
    case 'changed_fname': {
      return {
        ...state,
        firstName: action.firstName,
      };
    }
    case 'changed_lname': {
      return {
        ...state,
        lastName: action.lastName,
      };
    }
    case 'changed_email': {
      return {
        ...state,
        email: action.email,
      };
    }
    case 'changed_phone': {
      return {
        ...state,
        phone: action.phone,
      };
    }
    // school-specific data
    case 'added_school': {
      return {
        ...state,
        schools: [...state.schools, { ...SCHOOL_TEMPLATE, id: schoolId++ }],
      };
    }
    case 'removed_school': {
      return {
        ...state,
        schools: state.schools.filter((school) => school.id !== action.id),
      };
    }
    case 'saved_school':
    case 'changed_school_year':
    case 'changed_school_name':
    case 'changed_school_discipline': {
      let [index, schoolToChange] = [];
      for (let i = 0; i < state.schools.length; i++) {
        if (state.schools[i].id === action.id) {
          [index, schoolToChange] = [i, state.schools[i]];
          break;
        }
      }
      const schoolsCopy = [
        ...state.schools.slice(0, index),
        null,
        ...state.schools.slice(index + 1),
      ];
      if (action.type === 'saved_school') {
        schoolsCopy[index] = {
          ...schoolToChange,
          name: schoolToChange.name.trim(),
          discipline: schoolToChange.discipline.trim(),
        };
      } else if (action.type === 'changed_school_year')
        schoolsCopy[index] = {
          ...schoolToChange,
          graduation: action.graduation,
        };
      else if (action.type === 'changed_school_name')
        schoolsCopy[index] = { ...schoolToChange, name: action.name };
      else if (action.type === 'changed_school_discipline')
        schoolsCopy[index] = {
          ...schoolToChange,
          discipline: action.discipline,
        };
      return { ...state, schools: schoolsCopy };
    }
    // job-specific data
    case 'added_job':
      return {
        ...state,
        jobs: [...state.jobs, { ...JOB_TEMPLATE, id: jobId++ }],
      };
    case 'removed_job':
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.id),
      };
    case 'saved_job':
    case 'changed_job_start':
    case 'changed_job_end':
    case 'changed_job_company':
    case 'changed_job_position':
    case 'changed_job_details': {
      let [index, jobToChange] = [];
      for (let i = 0; i < state.jobs.length; i++) {
        if (state.jobs[i].id === action.id) {
          [index, jobToChange] = [i, state.jobs[i]];
          break;
        }
      }
      const jobsCopy = [
        ...state.jobs.slice(0, index),
        null,
        ...state.jobs.slice(index + 1),
      ];
      if (action.type === 'saved_job') {
        jobsCopy[index] = {
          ...jobToChange,
          company: jobToChange.company.trim(),
          position: jobToChange.position.trim(),
          details: jobToChange.details.trim(),
        };
      } else if (action.type === 'changed_job_start')
        jobsCopy[index] = { ...jobToChange, startDate: action.startDate };
      else if (action.type === 'changed_job_end')
        jobsCopy[index] = { ...jobToChange, endDate: action.endDate };
      else if (action.type === 'changed_job_company')
        jobsCopy[index] = { ...jobToChange, company: action.company };
      else if (action.type === 'changed_job_position')
        jobsCopy[index] = { ...jobToChange, position: action.position };
      else if (action.type === 'changed_job_details')
        jobsCopy[index] = { ...jobToChange, details: action.details };
      return { ...state, jobs: jobsCopy };
    }
    // form submission
    case 'submit': {
      const schoolsCopy = [];
      const jobsCopy = [];
      state.schools.forEach((school) =>
        schoolsCopy.push({
          ...school,
          name: school.name.trim(),
          discipline: school.discipline.trim(),
        }),
      );
      state.jobs.forEach((job) =>
        jobsCopy.push({
          ...job,
          company: job.company.trim(),
          position: job.position.trim(),
          details: job.details.trim(),
        }),
      );
      return {
        ...state,
        firstName: formatName(state.firstName),
        lastName: formatName(state.lastName),
        email: formatEmail(state.email),
        schools: schoolsCopy.sort(schoolComparisonFn),
        jobs: jobsCopy.sort(jobComparisonFn),
      };
    }
    // error handling
    default:
      throw Error('Unknown action:', action.type);
  }
}

export { initialState, personReducer };
