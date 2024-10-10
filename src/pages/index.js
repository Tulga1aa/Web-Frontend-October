import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import OneRecord from "../components/OneRecord";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import RentIcon from "../../public/icons/RentIcon";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import axios from "axios";
import AddRecord from "../components/AddRecord";
import { SideBar } from "../components/Sidebar";
import { categoryIconByCategoryName } from "../util/findCategoryIcon";

const categories = [
  "Food & Drinks",
  "Lending & Renting",
  "Shopping",
  "Housing",
  "Transportation",
  "Vehicle",
  "Life & Entertainment",
  "Communication, PC",
  "Financial expenses",
  "Investments",
  "Income",
  "Others",
];

let checked = [
  "true",
  "true",
  "true",
  "true",
  "true",
  "true",
  "true",
  "true",
  "true",
  "true",
  "true",
  "true",
];
let userid = 0;
const Home = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState("All");
  const [myRecords, setRecords] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [selectedEyes, setSelectedEyes] = useState(checked);
  const [checkedCategories, setCheckedCategories] = useState(categories);
  const [filter, setFilter] = useState("All");
  const [allRecords, setAllRecords] = useState([]);

  if (typeof window !== "undefined") {
    userid = localStorage.getItem("user_id");
  }

  useEffect(() => {
    axios
      .post("http://localhost:8000/transaction/userid", { userid: userid })
      .then(function (response) {
        setRecords(response.data.userTransactions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);

    if (selectedFilter === "All") {
      setRecords(allRecords);
    } else if (selectedFilter === "Income") {
      const incomeRecords = allRecords?.filter(
        (record) => record.transactiontype === "INC"
      );

      setRecords(incomeRecords);
    } else if (selectedFilter === "Expense") {
      const expenseRecords = allRecords?.filter(
        (record) => record.transactiontype === "EXP"
      );
      setRecords(expenseRecords);
    }
  };

  const handleCategory = (input, index) => {
    let myCategories = [...selectedEyes];
    if (input == "true") {
      myCategories[index] = "false";
    } else {
      myCategories[index] = "true";
    }
    setSelectedEyes(myCategories);
    let filteredCategories = [];
    for (let i = 0; i < categories.length; i++) {
      if (selectedEyes[i] == "true") {
        filteredCategories.push(selectedCategories[i]);
      }
    }
    setCheckedCategories();
  };

  const handleChange = (option) => {
    setSelected(option);
  };

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div>
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord onCloseModal={handleAdd} />
        </div>
      )}
      {/* <AddRecord /> */}
      <div className={`bg-[#F3F4F6] flex flex-col gap-8 items-center relative`}>
        <Navbar />

        <div className="flex gap-6">
          <SideBar
            handleAdd={handleAdd}
            selected={selected}
            categories={categories}
            handleAll={() => handleFilterChange("All")}
            handleChange={handleChange}
            handleIncome={() => handleFilterChange("Income")}
            handleExpense={() => handleFilterChange("Expense")}
            handleCategory={handleCategory}
            selectedEyes={selectedEyes}
          />

          <div className="w-[894px] flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
                  <FaChevronLeft />
                </div>
                <p className="font-normal text-base"> Last 30 Days</p>
                <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
                  <FaAngleRight />
                </div>
              </div>
              <select className="w-[180px] py-3 px-4 rounded-lg font-semibold text-base text-[#1F2937] border border-[#D1D5DB]">
                <option defaultChecked>Newest First</option>
                <option> Latest First </option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-base"> Today </p>
              <div className="flex flex-col gap-3 mb-3">
                {myRecords?.map((recordToday, index) => {
                  return (
                    <OneRecord
                      key={index}
                      categoryname={recordToday?.categoryname}
                      transactiontype={recordToday?.transactiontype}
                      image={recordToday.image}
                      time={recordToday.transactioncreatedat}
                      color={recordToday.color}
                      money={recordToday.amount}
                    />
                  );
                })}
              </div>
              <p className="font-semibold text-base"> Yesterday </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
