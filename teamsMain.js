const { useState, useEffect } = React;

const {
  BrowserRouter: Router,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate,
  useParams,
  useLocation,
  useNavigation,
} = ReactRouterDOM;

const BASE_URL = "http://localhost:9000";

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return "Please sign in again.";
    case 403:
      return "You do not have permission to view the data requested.";
    default:
      return "There was an error saving or retrieving data.";
  }
}
async function checkStatus(response) {
  if (response.ok) return response;
  const httpError = {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    body: await response.text(),
  };
  console.log(`http error status: ${JSON.stringify(httpError, null, 1)}`);

  let errorMessage = translateStatusToErrorMessage(httpError.status);
  throw new Error(errorMessage);
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const url = `${BASE_URL}/teams`;
const teamAPI = {
  list() {
    return fetch(url).then(checkStatus).then(parseJSON);
  },
};

function HomePage() {
  return <h2>Home</h2>;
}

function TeamsPage() {
  return (
    <div>
      <header className="d-flex justify-content-between mb-4">
        <h2>Teams</h2>
        <Link className="btn btn-outline-secondary" to="/teams/create">
          + Add Team{" "}
        </Link>
      </header>
      <hr />
      <TeamList />
      
    </div>
  );
}
function TeamList() {
  const [busy, setBusy] = useState(false);
  const [teams, setTeams] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadTeams() {
    try {
      setBusy(true);
      let data = await teamAPI.list();
      setTeams(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setBusy(false);
  }

  useEffect(function () {
    loadTeams();
  }, []);

  return (
    <div className="list mt-2">
      {busy && <p>Loading...</p>}
      {errorMessage && (
        <div className="alert alert-warning d-flex alighn-items-center" role="alert">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          {errorMessage}
        </div>
      )}
      {teams?.map((team) => (
        <div className="card p-4" key={team.id}>
          <strong> TEAM: {team.name}</strong>
          <div>DIVISION: {team.division}</div>
          <Link to={`/teams/edit/${team.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}

function TeamCreatePage() {
  return (
    <div>
      <header className="d-flex justify-content-between mb-4">
        <h2>Add Team</h2>
      </header>
      <hr />
      <TeamForm />
    </div>
  );
}
function TeamEditPage() {
  return (
    <div>
      <header className="d-flex justify-content-between mb-4">
        <h2>Edit Team</h2>
      </header>
      <hr />
      <TeamForm />
    </div>
  );
}
function TeamForm() {
  const { id: idFromUrl } = useParams();
  const id = Number(idFromUrl);
  return (
    <form className="w-25">
      <div className="mb-3">
        <label htmlFor="team" className="form-label">
          Team {id}
        </label>
        <input id="team" type="text" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="division" className="form-label">
          Division
        </label>
        <input id="division" type="text" className="form-control" />
      </div>
      <hr />
      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <button className="btn btn-outline-secondary">Cancel</button>
      </div>
    </form>
  );
}

function DivisionPage() {
  return <h2>DIVISION</h2>;
}

function NotFound() {
  return (
    <>
      <h2>Uh oh.</h2>
      <p>The page you requested could not be found. Is there any chance you were looking for one of these?</p>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="mt-4 mb-5">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/division">
                Division
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="Division" element={<DivisionPage />} />
            <Route path="teams/create" element={<TeamCreatePage />} />
            <Route path="teams/edit/:id" element={<TeamEditPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
