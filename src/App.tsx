import { useState } from "react";

import "./App.css";
import { set } from "react-hook-form";

function App() {
  const [student, setStudents] = useState([
    { id: 0, name: "amit", job: "hr", age: 22, score: 80 },
    { id: 1, name: "raman", job: "hr", age: 18, score: 70 },
  ]);

  const [duplicate, setDuplicate] = useState();
  
  const [newStudent, setNewStudent] = useState({
    name: "",
    job: "",
    age: 0,
    score: 0,
  });

  const [filters, setFilters] = useState({
    filterName: "",
    filterScore: "",
  });

  function addData() {
    setStudents((prev) => {
      return [...student, { id: student.length, ...newStudent }];
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewStudent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleEdit(id, field, value) {
    setStudents(
      student.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  }

  function handleFilterChange(e: any, filterType: any) {
    if (filterType === "name") {
      setFilters((prev) => ({
        ...prev,
        filterName : e.target.value,
      }));
    } else if (filterType === "score") {
      setFilters((prev) => ({
        ...prev,
        filterScore: e.target.value,
      }));
    }
    // console.log("filters", filters);
  }

  function print() {
    console.log(newStudent);
    console.log("student", student);
    console.log("filters", filters);
  }

  function onDelete(id: any) {
    const filteredStudent = student.filter((obj) => obj.id != id);
    setStudents((prev) => {
      return filteredStudent;
    });
  }
function handleAddData(option :string) {
  setDuplicate(JSON.parse(JSON.stringify(student)));

  if (option === "name") {
    setStudents(student.filter((obj) => obj.name === filters.filterName));
  } else if (option === "score") {
    setStudents(
      student.filter((obj) => parseInt(obj.score) == parseInt(filters.filterScore))
    );
  }
}

function handleRemoveData(option: string) {
  setStudents(JSON.parse(JSON.stringify(duplicate)));
}
  return (
    <>
      <div>
        <h3>filter on the bases name </h3>
        <input
          type="text"
          name="filterName"
          id="filterName"
          onChange={(e) => handleFilterChange(e, "name")}
        />
        <button onClick={() => handleAddData("name")}>filter</button>
        <button onClick={() => handleRemoveData("name")}>remove filter</button>

        <h3>filter on the bases score</h3>
        <input
          type="text"
          name="filterScore"
          onChange={(e) => handleFilterChange(e, "score")}
        />
        <button onClick={() => handleAddData("score")}>filter</button>
        <button onClick={() => handleRemoveData("score")}>remove filter</button>
      </div>
      <table className="table" border={1}>
        <thead>Details of the students</thead>
        <tbody>
         
          <tr >
            {student.map((obj, index) => {
              return (
                <tr key={obj.id} style={{ border: "2px black" }}>
                  <label htmlFor="name">name : </label>
                  <input
                    type="text"
                    value={obj.name}
                    onChange={(e) => handleEdit(obj.id, "name", e.target.value)}
                  />
                  <label htmlFor="job">job : </label>
                  <input
                    type="text"
                    value={obj.job}
                    onChange={(e) => handleEdit(obj.id, "job", e.target.value)}
                  />
                  <label htmlFor="age">age : </label>
                  <input
                    type="text"
                    value={obj.age}
                    onChange={(e) => handleEdit(obj.id, "age", e.target.value)}
                  />

                  <label htmlFor="score">score : </label>

                  <input
                    type="text"
                    value={obj.score}
                    onChange={(e) =>
                      handleEdit(obj.id, "score", e.target.value)
                    }
                  />
                  <button onClick={() => onDelete(obj.id)}>delete</button>
                  {/* // <button>edit</button> */}
                </tr>
              );
            })}
          </tr>
        </tbody>
        <h2>For Adding the new Data</h2>
        <label htmlFor="name">name : </label>
        <input type="text" name="name" onChange={handleChange} />
        <label htmlFor="job">job : </label>
        <input type="text" name="job" onChange={handleChange} />
        <label htmlFor="age">age : </label>
        <input type="text" name="age" onChange={handleChange} />
        <label htmlFor="score">score : </label>
        <input type="text" name="score" onChange={handleChange} />
        <button onClick={addData}>Add data</button>
        <button onClick={print}>print new students</button>
      </table>
    </>
  );
}

export default App;

// const filteredStudents = students.filter((student) => {
//   const nameMatch = student.name
//     .toLowerCase()
//     .includes(filters.filterName.toLowerCase());

//   const minScoreMatch =
//     filters.minScore === "" || student.score >= parseInt(filters.minScore);
//   const maxScoreMatch =
//     filters.maxScore === "" || student.score <= parseInt(filters.maxScore);

//   return nameMatch && minScoreMatch && maxScoreMatch;
// });
