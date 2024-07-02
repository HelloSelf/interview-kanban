import React, { useState } from "react";
import "./App.css";

type Inputs = { title: string, name: string, age: string, email: string, phone: string }
type Errors = Partial<Record<keyof Inputs, string>>

function App() {
  const [inputs, setInputs] = useState<Inputs>({ title: "", name: "", age: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [unclaimedList, setUnclaimedList] = useState<Array<Inputs>>(JSON.parse(localStorage.getItem("unclaimedList") || '""'));
  const firstContactList = [];
  const workOfferList = [];
  const therapistsList = [];

  const validate = (formInputs: Inputs): Errors => {
    setIsUpdated(true);
    const newErrors: Errors = {};

    if (formInputs.title.trim() === "") {
      newErrors.title = "Title cannot be empty."
    }
    var specialChars = /[^a-zA-Z ]/g;
    if (formInputs.name.match(specialChars)) {
      newErrors.name = "Please enter a valid name."
    }
    if (isNaN(Number(formInputs.age))) {
      newErrors.age = "Please enter a valid number."
    }
    if (!formInputs.email.includes("@")) {
        newErrors.email = "Please enter a valid email."
    }
    if (formInputs.phone.trim() === "") {
      newErrors.phone = "Phone cannot be empty."
    }

    return newErrors;
}

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      title: {value: string},
      name: {value: string},
      age: {value: string},
      email: {value: string},
      phone: {value: string}
    }
    if(!(errors.title || errors.name || errors.age || errors.email || errors.phone) && isUpdated) {
      let inputs: Inputs = {
        title: formElements.title.value,
        name: formElements.name.value,
        age: formElements.age.value,
        email: formElements.email.value,
        phone: formElements.phone.value,
      };
      localStorage.setItem("unclaimedList", JSON.stringify([...unclaimedList, inputs]));
      setUnclaimedList([...unclaimedList, inputs]);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <b>Kanban Board</b>
      </header>

      <div className="App-content">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "30px",
            gap: "15px",
          }}
        >
          <b>Form</b>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="title"
                  name="title"
                  onChange={event => {
                    setInputs({ ...inputs, title: event.target.value });
                    setErrors(validate({ ...inputs, title: event.target.value }));
                  }}
                  value={inputs.title}
                />
                {errors.title? <p className="text-red-500 text-xs italic">{errors.title}</p> : null}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                  name="name"
                  onChange={event => {
                    setInputs({ ...inputs, name: event.target.value })
                    setErrors(validate({ ...inputs, name: event.target.value }));
                  }}
                  value={inputs.name}
                />
                {errors.name? <p className="text-red-500 text-xs italic">{errors.name}</p> : null}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="age"
                  name="age"
                  onChange={event => {
                    setInputs({ ...inputs, age: event.target.value })
                    setErrors(validate({ ...inputs, age: event.target.value }));
                  }}
                  value={inputs.age}
                />
                {errors.age? <p className="text-red-500 text-xs italic">{errors.age}</p> : null}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                  name="email"
                  onChange={event => {
                    setInputs({ ...inputs, email: event.target.value });
                    setErrors(validate({ ...inputs, email: event.target.value }));
                  }}
                  value={inputs.email}
                />                
                {errors.email? <p className="text-red-500 text-xs italic">{errors.email}</p> : null}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={event => {
                    setInputs({ ...inputs, phone: event.target.value })
                    setErrors(validate({ ...inputs, phone: event.target.value }));
                  }}
                  value={inputs.phone}
                />
                {errors.phone? <p className="text-red-500 text-xs italic">{errors.phone}</p> : null}
              </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-[#bed0de]" type="submit">Submit</button>
          </form>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div className="basis-full rounded shadow-sm border-[#bed0de] border-2">
              <div className="flex flex-row justify-between mt-2">
                <b className="text-left w-48 h-4 mr-3 ml-3">Unclaimed</b>
                <div className="grid justify-items-center bg-gray-300 rounded-full w-4 h-4 mr-3"><p className="text-xs mb-3 w-4 h-4 mr-3">{unclaimedList.length}</p></div>
              </div>
              <div className="grid grid-rows-2 gap-2 p-2">
                {unclaimedList.map((unclaimed) => (
                  <div className="p-2 rounded shadow-sm bg-white">
                    <div className="flex flex-row justify-between mt-2">
                      <p className="text-sm text-left mb-3 w-40 h-4 mr-3 font-extrabold">{unclaimed.title} {unclaimed.name}</p>
                      <p className="text-xs mb-3 w-4 h-4 mr-3 font-light">{`${unclaimed.age}.yo`}</p>
                    </div>
                    <p className="text-xs mb-3 w-4 h-4 mr-3">{unclaimed.email}</p>
                    <p className="text-xs mb-3 w-4 h-4 mr-3 font-light">{unclaimed.phone}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="basis-full rounded shadow-sm bg-[#bed0de]">
              <div className="flex flex-row justify-between mt-2">
                <b className="text-left w-48 h-4 mr-3 ml-3">First Contact</b>
                <div className="grid justify-items-center bg-gray-300 rounded-full w-4 h-4 mr-3"><p className="text-xs mb-3 w-4 h-4 mr-3">{firstContactList.length}</p></div>
              </div>
              <div className="grid grid-rows-2 gap-2 p-2"></div>
            </div>
            <div className="basis-full rounded shadow-sm bg-[#bed0de]">
              <div className="flex flex-row justify-between mt-2">
                <b className="text-left w-48 h-4 mr-3 ml-3">Preparing Work Offer</b>
                <div className="grid justify-items-center bg-gray-300 rounded-full w-4 h-4 mr-3"><p className="text-xs mb-3 w-4 h-4 mr-3">{workOfferList.length}</p></div>
              </div>
              <div className="grid grid-rows-2 gap-2 p-2"></div>
            </div>
            <div className="basis-full rounded shadow-sm bg-[#bed0de]">
              <div className="flex flex-row justify-between mt-2">
                <b className="text-left w-48 h-4 mr-3 ml-3">Send to Therapists</b>
                <div className="grid justify-items-center bg-gray-300 rounded-full w-4 h-4 mr-3"><p className="text-xs mb-3 w-4 h-4 mr-3">{therapistsList.length}</p></div>
              </div>
              <div className="grid grid-rows-2 gap-2 p-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
