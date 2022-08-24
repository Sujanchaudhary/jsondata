import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState([]);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.Username === "" || item.MobileNumber === ""
    );

    if (someEmpty) {
      form.forEach((item, index) => {
        const allPrev = [...form];

        if (form[index].MobileNumber === "") {
          allPrev[index].errors.MobileNumber = "MobileNumber is required";
        }

        if (form[index].Username === "") {
          allPrev[index].errors.Username = "Username is required";
        }
        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleData = (e) => {
    e.preventDefault();
    const inputState = {
      MobileNumber: "",
      Username: "",

      errors: {
        MobileNumber: null,
        Username: null,
      },
    };

    if (prevIsValid()) {
      setForm((prev) => [...prev, inputState]);
      console.log(form)
    }
  };
  const onChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " Is required",
          },
        };
      });
    });
  };

  const handleDelete = (e, index) => {
    e.preventDefault();

    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };
  return (
    <div className="container mt-5 py-5">
      <h1 style={{textAlign: 'center'}}>JSON Data</h1>
      <hr/>
      <p style={{color: 'green', fontSize: '20px', textAlign:'center'}} >Add your mobile number with your name</p>

      {JSON.stringify(form)}

      <form>
        {form.map((item, index) => (
          <div className="row mt-3" key={`item-${index}`}>
            <div className="col">
              <input
                type="number"
                className={
                  item.errors.MobileNumber
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="MobileNumber"
                placeholder="MobileNumber"
                value={item.MobileNumber}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.MobileNumber && (
                <div className="invalid-feedback">{item.errors.MobileNumber}</div>
              )}
            </div>

            <div className="col">
              <input
                type="text"
                className={
                  item.errors.Username
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Username"
                placeholder="Username"
                value={item.Username}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Username && (
                <div className="invalid-feedback">{item.errors.Username}</div>
              )}
            </div>
            <div className="col">
            <button
              className="btn btn-warning"
              onClick={(e) => handleDelete(e, index)}
            >
              Remove
            </button>
            </div>
           
          </div>
        ))}

        <button className="btn btn-primary mt-2" onClick={handleData}>
          Add data
        </button>
      </form>
    </div>
  );
}

export default App;