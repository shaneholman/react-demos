const { useState, useEffect } = React;
const { useForm } = ReactHookForm;

const {
  BrowserRouter: Router,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate,
  useParams,
  useLocation,
  useNavigate,
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

  async function loadTeams() {
    setBusy(true);
    let data = await teamAPI.list();
    setTeams(data);
    setBusy(false);
  }

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div className="list mt-2">
      {busy && <div>Loading...</div>}

      {teams.map((team) => (
        <div className="card p-4" key={team.id}>
          <strong>{team.name}</strong>
          <div>{team.division}</div>
          <Link to={`/team/edit/${team.id}`}>edit</Link>
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function save(team) {
    try {
      setBusy(true);
      let newTeam = await teamAPI.insert(team);
      navigate("/teams");
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  const { id: idFromUrl } = useParams();
  const id = Number(idFromUrl);
  return (
    <>
      {busy && <p>Saving...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="w-25" onSubmit={handleSubmit(save)}>
        <div className="mb-3">
          <label htmlFor="team" className="form-label">
            Team
          </label>
          <input
            id="team"
            type="text"
            className={`form-control ${errors?.team && "is-invalid"}`}
            {...register("team", { required: "Team Name is required" })}
          />
          <p className=""></p>
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
          <Link to="/teams" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </>
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
