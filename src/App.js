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
        if (form[index].Address === "") {
          allPrev[index].errors.Address = "Address is required";
        }
        if (form[index].Country === "") {
          allPrev[index].errors.Country = "Country is required";
        }
        if (form[index].Email === "") {
          allPrev[index].errors.Email= "Email is required";
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
      Address: "",
      Country: "",
      Email: "",

      errors: {
        MobileNumber: null,
        Username: null,
        Address: null,
        Country: null,
        Email: null,
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
                : [event.target.name] + "is required",
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
              <input
                type="text"
                className={
                  item.errors.Address
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Address"
                placeholder="Address"
                value={item.Address}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Address && (
                <div className="invalid-feedback">{item.errors.Address}</div>
              )}
            </div>
            <div className="col">
              <input
                type="text"
                className={
                  item.errors.Country
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Country"
                placeholder="Country"
                value={item.Country}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Country && (
                <div className="invalid-feedback">{item.errors.Country}</div>
              )}
            </div>
            <div className="col">
              <input
                type="Email"
                className={
                  item.errors.Email
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Email"
                placeholder="Email"
                value={item.Email}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Email && (
                <div className="invalid-feedback">{item.errors.Email}</div>
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