// function ExampleForm() {
//   const [value, setValue] = React.useState('');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <form>
//       <input type="text" value={value} onChange={handleChange} />
//       <pre>{value}</pre>
//     </form>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<ExampleForm />);

// function ExampleForm() {
//   return (
//     <form>
//       <input type="text" value=" TEST"></input>
//     </form>
//   );
// }
// ReactDOM.createRoot(document.getElementById('root')).render(<ExampleForm />);

const { useState, useEffect } = React;
function ContactUsForm() {
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stateToString({ message, department, agreedToTerms }));
  };
  const stateToString = (state) => {
    return JSON.stringify(state);
  };

  return (
    <div className="container">
      <form className="card p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="department">Department:</label>
          <select
            className="form-select"
            id="department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">Select a department</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Support">Support</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="message">Message:</label>
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>

        <div className="mb-2 form-check">
          <input type="checkbox" className = "form-check-label"checked={agreedToTerms} onChange={(event) => setAgreedToTerms(event.target.checked)} />
          <label className="form-check-label">  I agree to the terms and conditions</label>
        </div>
        <hr />
        <div className="d-flex gap-2  justify-content-end">
          <button className="btn btn-primary" type="submit">
            Send
          </button>
          <button className="btn btn-danger" type="submit">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ContactUsForm />);
