// import { Component } from "react";
import "./card.styles.css";

const Card = ({ monster }) => {
  const { id, name, email } = monster;
  return (
    <div className="card-container" key={id}>
      <img
        alt={`monsters ${name}`}
        src={`https://robohash.org/${id}?set=set2`}
      />
      <h2>{name}</h2>
      <h2>{email}</h2>
    </div>
  );
};

// class Card extends Component {
//   render() {
//     const { monster } = this.props;
//     const { id, name, email } = monster;

//     return (
//       <div className="card-container" key={id}>
//         <img
//           alt={`monsters ${name}`}
//           src={`https://robohash.org/${id}?set=set2`}
//         />
//         <h2>{name}</h2>
//         <h2>{email}</h2>
//       </div>
//     );
//   }
// }

export default Card;
