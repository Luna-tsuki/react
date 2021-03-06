// import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import { useState, useEffect } from "react";
import "./App.css";
import "swiper/css/bundle";

import TodoListExample from "./components/todolist/todolist-example";
import TodoList from "./components/todolist/todolist.component";
import TodoListRef from "./components/todolist/todolistref.component";
import Recommend from "./components/recommend/recommend.component";
import UserHistory from "./components/user-history/user-history.component.jsx";
import CategoryPro from "./myroutes/category/categoryPro.component.jsx";

import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component.jsx";
import Home from "./routes/home/home.component.jsx";

import Category from "./myroutes/category/category.component.jsx";
import EcHome from "./myroutes/echome/echome.component.jsx";
import ItemList from "./myroutes/itemlist/itemlist.component.jsx";
import SubItemList from "./myroutes/subitemlist/subitemlist.component.jsx";
import Product from "./myroutes/product/product.component.jsx";
//-----------------------------------------------------------------------------------

const Shop = () => {
  return <h1>Shop</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Category />}>
        <Route index element={<EcHome />} />
        <Route path="itemlist/:categoryIdString" element={<ItemList />} />
        <Route path="product" element={<Product />} />
        {/* <Route path="itemlist/:subCategoryIdString" element={<ItemList />} /> */}
        {/* <Route
          path="itemlist/:categoryIdString/:subCategoryIdString"
          element={<SubItemList />}
        /> */}
      </Route>
      {/* 
      <Route path="/category" element={<Category />} />
      <Route path="/userhistory" element={<UserHistory />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/todolistref" element={<TodoListRef />} />
      <Route path="/todolist" element={<TodoList />} /> */}
    </Routes>

    // <Routes>
    //   <Route path="/" element={<Navigation />}>
    //     <Route index element={<Home />} />
    //     <Route path="shop" element={<Shop />} />
    //   </Route>
    // </Routes>
  );
};

// ----------------------------function?????? Monsters??????----------------------------
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

// ----------------------------class?????? Monsters??????---------------------------
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
