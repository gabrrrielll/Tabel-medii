import React from "react";
import ReactDOM from "react-dom";
import AdaugaStudent from "./components/adaugaStudent";

import "./index.css";

var ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

class Grupa extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [],
      sortData: {
        direction: 1,
        columnName: ""
      }
    };
    //this.adaugaStudent = this.adaugaStudent.bind(this)
  }

  componentDidMount() {
    fetch("https://demo3305866.mockable.io/tema_studenti_react")
      .then(response => response.json())
      .then(x =>
        this.setState({
          students: x.students.map(x => {
            x.key = ID();
            return x;
          })
        })
      );
  }

  adaugaStudent = e => {
    //alert(key);
    e.preventDefault();
    //console.log(e.target.nume.value);

    const students = [...this.state.students];
    var mesaj = [];
    if (e.target.nume.value == "") {
      mesaj.push("Trebuie sa introduci un nume");
    } else if (!e.target.nume.value.match(/^[a-zA-Z]+$/)) {
      mesaj.push("Numele este incorect");
    } else {
      var nume = e.target.nume.value;
    }

    if (e.target.prenume.value == "") {
      mesaj.push("Trebuie sa introduci un prenume");
    } else if (!e.target.prenume.value.match(/^[a-zA-Z]+$/)) {
      mesaj.push("Preumele este incorect");
    } else {
      var prenume = e.target.prenume.value;
    }

    if (e.target.varsta.value == "") {
      mesaj.push("Trebuie sa introduci o varsta");
    } else if (!e.target.varsta.value.match(/^[0-9]{1,2}[:.,-]?$/)) {
      mesaj.push("Varsta este incorecta");
    } else {
      var varsta = e.target.varsta.value;
    }

    if (e.target.media.value == "") {
      mesaj.push("Trebuie sa introduci o medie");
    } else if (!e.target.media.value.match(/^[-+]?[0-9]+\.[0-9]+$/)) {
      mesaj.push("Media este incorecta");
    } else {
      var media = e.target.media.value;
    }
    students.push({
      nume: nume,
      prenume: prenume,
      varsta: varsta,
      media: media,
      key: ID()
    });
    //
    if (mesaj[0]) {
      alert(mesaj[0]);
    } else {
      this.setState({ students });
    }
  };

  eliminaStudent = key => {
    //alert(key);
    this.setState(prevState => {
      const students = prevState.students.filter(m => m.key !== key);
      return {
        students
      };
    });
  };

  sortare = col => {
    var { direction, columnName } = this.state.sortData;
    if (columnName === col) {
      direction = direction * -1;
    } else {
      direction = 1;
      columnName = col;
    }
    //console.log(col);
    if (col == "nume") {
      var student =
        direction === 1
          ? this.state.students.sort((a, b) =>
              a.nume.toUpperCase() > b.nume.toUpperCase() ? 1 : -1
            )
          : this.state.students.sort((a, b) =>
              a.nume.toUpperCase() < b.nume.toUpperCase() ? 1 : -1
            );
    }
    if (col == "prenume") {
      var student =
        direction === 1
          ? this.state.students.sort((a, b) =>
              a.prenume.toUpperCase() > b.prenume.toUpperCase() ? 1 : -1
            )
          : this.state.students.sort((a, b) =>
              a.prenume.toUpperCase() < b.prenume.toUpperCase() ? 1 : -1
            );
    }
    if (col == "varsta") {
      var student =
        direction === 1
          ? this.state.students.sort((a, b) => (a.varsta > b.varsta ? 1 : -1))
          : this.state.students.sort((a, b) => (a.varsta < b.varsta ? 1 : -1));
    }
    if (col == "media") {
      var student =
        direction === 1
          ? this.state.students.sort((a, b) => (a.media > b.media ? 1 : -1))
          : this.state.students.sort((a, b) => (a.media < b.media ? 1 : -1));
    }

    // console.log(x);
    this.setState({ students: student, sortData: { direction, columnName } });
  };
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th onClick={() => this.sortare("nume")}>Nume</th>
              <th onClick={() => this.sortare("prenume")}>Prenume</th>
              <th onClick={() => this.sortare("varsta")}>Varsta</th>
              <th onClick={() => this.sortare("media")}>Medie</th>
              <th>Sterge</th>
            </tr>
          </thead>
          {this.state.students.map(x => {
            return (
              <tbody>
                <tr key={x.key}>
                  <td>{x.nume}</td>
                  <td>{x.prenume}</td>
                  <td>{x.varsta} </td>
                  <td>{x.media}</td>
                  <td>
                    <button onClick={() => this.eliminaStudent(x.key)}>
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <form onSubmit={this.adaugaStudent}>
          <input type="text" id="nume" name="nume" placeholder="Nume" />
          <input
            type="text"
            id="prenume"
            name="prenume"
            placeholder="Prenume"
          />
          <input type="text" id="varsta" name="varsta" placeholder="Varsta" />
          <input type="text" id="media" name="media" placeholder="Media" />
          <br />
          <button type="submit" id="submit">
            Adauga elev in lista
          </button>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Grupa />, rootElement);
