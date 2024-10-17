// import axios from "axios";
// import OneRecord from "./OneRecord";
// import { useEffect, useState } from "react";
// import FoodExpense from "../../public/icons/FoodExpenseIcon";
// import RentIcon from "../../public/icons/RentIcon";
// import moment from "moment";

// const LatestFirst = ({ userid, filter, search, categories }) => {
//   const [ascendingTransactions, setAscendingTransactions] = useState([]);
//   useEffect(() => {
//     axios
//       .post("http://localhost:8000/transaction/getAscendingTransactions", {
//         user_id: userid,
//         filter: filter,
//         search: search,
//         categories: categories,
//       })
//       .then(function (response) {
//         console.log(response);
//         setAscendingTransactions(response.data.transactions);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, [search, filter, categories, userid]);

//   let transaction_color = "";
//   let icon = null;
//   let plusMinusSign = "";
//   return (
//     <div className="flex flex-col gap-3 mb-3">
//       {ascendingTransactions?.map((recordToday, index) => {
//         if (recordToday.transaction_type === "INC") {
//           transaction_color = "#23E01F";
//           icon = <RentIcon />;
//           plusMinusSign = "+";
//         } else {
//           transaction_color = "#F54949";
//           icon = <FoodExpense />;
//           plusMinusSign = "-";
//         }
//         return (
//           <OneRecord
//             key={index}
//             text={recordToday.name}
//             image={icon}
//             time={moment(recordToday.created_at).format("L")}
//             color={transaction_color}
//             money={plusMinusSign + " " + String(recordToday.amount)}
//             iconColor={transaction_color}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default LatestFirst;
