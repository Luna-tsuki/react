// import { Component } from "react";
import Card from "../card/card.component";

import "./card-list.styles.css";

const CardList = ({ monsters }) => (
  <div className="card-list">
    {monsters.map((monster) => {
      return <Card monster={monster} />;
    })}
  </div>
);

// class CardList extends Component {
//   render() {
//     const { monsters } = this.props;

//     return (
//       <div className="card-list">
//         {monsters.map((item) => {
//           return <Card monster={item} />;
//         })}
//       </div>
//     );
//   }
// }

export default CardList;
