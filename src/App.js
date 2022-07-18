// import { Component } from "react";
import CardList from "./components/card-list/card-list.component";

import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

import { useState, useEffect } from "react";
import TodoListExample from "./components/todolist/todolist-example";
import TodoList from "./components/todolist/todolist.component";
import TodoListRef from "./components/todolist/todolistref.component";
import Recommend from "./components/recommend/recommend.component";
import UserHistory from "./components/user-history/user-history.component.jsx";

//----------------------------todolist 项目----------------------------
const App = () => {
  return (
    <div className="App">
      {/* <TodoListExample /> */}
      {/* <TodoList /> */}
      <TodoListRef />
      <Recommend />
      <UserHistory />
    </div>
  );
};

// ----------------------------function写法 Monsters项目----------------------------
// const App = () => {
//   const [searchField, setSearchField] = useState("");
//   const [monsters, setMonsters] = useState([]);
//   const [filteredMonsters, setFilteredMonsters] = useState(monsters);
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) => setMonsters(users));
//   }, []);
//   useEffect(() => {
//     const newFilteredMonsters = monsters.filter((monsters) => {
//       return monsters.name.toLocaleLowerCase().includes(searchField);
//     });
//     setFilteredMonsters(newFilteredMonsters);
//   }, [monsters, searchField]);
//   const onSearchChange = (event) => {
//     const searchFieldString = event.target.value.toLocaleLowerCase();
//     setSearchField(searchFieldString);
//   };
//   return (
//     <div className="App">
//       <h1 className="app-title">Monsters Rolodex</h1>
//       <SearchBox
//         className="monsters-search-box"
//         placeholder="search monsters"
//         onChangeHandler={onSearchChange}
//       />
//       <CardList monsters={filteredMonsters} />
//     </div>
//   );
// };

// ----------------------------class写法 Monsters项目---------------------------
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {
//             console.log(this.state);
//           }
//         )
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monsters) => {
//       return monsters.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         {/* <input
//           className="search-box"
//           type="search"
//           placeholder="search monsters"
//           onChange={onSearchChange}
//         /> */}
//         {/* {filteredMonsters.map((monsters) => {
//           return (
//             <div key={monsters.id}>
//               <h1>{monsters.name}</h1>
//             </div>
//           );
//         })} */}
//         <SearchBox
//           className="monsters-search-box"
//           placeholder="search monsters"
//           onChangeHandler={onSearchChange}
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
