const { useForm } = ReactHookForm;

function ContactUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function send(FormData) {
    console.log("Form submitted:", FormData);
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit(send)}>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <select
          id="department"
          className={`form-select ${errors.department ? "is-invalid" : ""}`}
          {...register("department", { required: "Department is required" })}
        >
          <option value="">Select...</option>
          <option value="hr">Human Resources</option>
          <option value="pr">Public Relations</option>
          <option value="support">Support</option>
        </select>
        {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          id="message"
          className={`form-control ${errors.message ? "is-invalid" : ""}`}
          {...register("message", { required: "Message is required" })}
          cols="30"
          rows="5"
        />
        {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="agreedToTerms"
          className={`form-check-input ${errors.agreedToTerms ? "is-invalid" : ""}`}
          {...register("agreedToTerms", { required: "Must Agree To Terms" })}
        />
        <label htmlFor="agreedToTerms" className="form-check-label">
          I agree to the terms and conditions.
        </label>
        {errors.agreedToTerms && <div className="invalid-feedback">{errors.agreedToTerms.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
}

function App() {
  return (
    <div className="container">
      <ContactUsForm />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const { useForm } = window.ReactHookForm;
// function ContactUsForm() {
//   const { register, handleSubmit, watch, formState: {errors}} = useForm();

//   function send(data) {
//      console.log(data);
//   }

//   return (
//     <form onSubmit={handleSubmit(send)}>
//       <select className="form-select" {...register('department')}>
//         <option value="">Select...</option>
//         <option value="hr">Human Resources</option>
//         <option value="pr">Public Relations</option>
//         <option value="support">Support</option>
//       </select>
//       <br />
//       <p className="alert"></p>
//       <br />
//       <textarea className="form-control"{...register('message')} cols="30" rows="10" />
//       <br />
//       <input className="form-check-label" {...register('agreeToTerms')} type="checkbox" />
//       I agree to the terms and conditions.
//       <br />
//       <button className="btn btn-primary">Send</button>
//       <pre>{JSON.stringify(watch())}</pre>
//     </form>
//   );
// }
// function App() {
//   return (
//     <div className="container">
//       <ContactUsForm />
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
