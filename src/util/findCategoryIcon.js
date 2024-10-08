import FoodExpense from "../../public/icons/FoodExpenseIcon";
import RentIcon from "../../public/icons/RentIcon";
import Shopping from "../../public/icons/Shopping";

const icons = [
  {
    color: "#23E01F",
    image: <RentIcon />,
    name: "Lending & Renting",
    iconColor: "#0166FF",
  },
  {
    color: "#F54949",
    image: <FoodExpense />,
    name: "Foods and Drinks",
    iconColor: "#FF4545",
  },
  {
    color: "#F54949",
    image: <Shopping />,
    name: "Shopping",
    iconColor: "#FF4545",
  },
];

export const categoryIconByCategoryName = (props) => {
  const icon = icons.find((icon) => icon.name === props.categoryname);
  return icon;
};
