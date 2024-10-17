import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const AddRecord = (props) => {
  const { onCloseModal } = props;
  const [incomeExpense, setIncomeExpense] = useState("Expense");
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("EXP");
  const [name, setName] = useState("");

  const handleIncomeOrExpense = (props) => {
    const { name } = props;
    setIncomeExpense(name);
    if (incomeExpense === "Expense") {
      setIncomeExpense("Income");
    } else {
      setIncomeExpense("Expense");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/transaction")
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  const handleAdd = async () => {
    const userid = localStorage.getItem("userid");
    console.log(userid);
    await axios
      .post("http://localhost:8000/category", {
        userid: userid,
        name: name,
        amount: amount,
        transaction_type: transactionType,
        description: description,
        categoryid: category,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const Expensebackground = incomeExpense === "Expense" ? "#0166FF" : "#F3F4F6";
  const Incomebackground = incomeExpense === "Income" ? "#16A34A" : "#F3F4F6";
  const buttonColor = incomeExpense === "Income" ? "#16A34A" : "#0166FF";

  const textColorIncome =
    incomeExpense === "Income" ? "text-white" : "text-base";
  const textColorExpense =
    incomeExpense === "Expense" ? "text-white" : "text-base";

  const today = new Date();
  const day = String(today.getDate());
  const year = String(today.getFullYear());
  const month = "0" + String(today.getMonth());
  const hour = String(today.getHours());
  const minutes = String(today.getMinutes());
  console.log(category);
  return (
    <div className="w-[792px] flex flex-col rounded-xl  border-b border-[#E2E8F0] bg-slate-200">
      <div className="py-5 px-6 flex justify-between">
        <p className="font-semibold text-xl">Add Record</p>
        <IoClose size={24} onClick={onCloseModal} className="cursor-pointer" />
      </div>
      <div>
        <form className="flex w-full" onSubmit={handleAdd}>
          <div className="px-6 pt-5 pb-6 flex flex-col gap-5">
            <div className="rounded-[100px] bg-[#F3F4F6] flex gap-1">
              <div
                onClick={() => handleIncomeOrExpense("Expense")}
                className= {`py-2 px-[55.5px] ${textColorExpense} cursor-pointer font-normal text-base rounded-3xl bg-[${Expensebackground}]`}
                style={{ backgroundColor: Expensebackground }}
              >
                Expense
              </div>
              <div
                onClick={() => handleIncomeOrExpense("Income")}
                onChange={(e) => setTransactionType(e.target.value)}
                className={`py-2 px-[55.5px] ${textColorIncome} cursor-pointer font-normal text-base rounded-3xl bg-[${Incomebackground}]`}
                style={{ backgroundColor: Incomebackground }}
              >
                Income
              </div>
            </div>
            <div className="flex flex-col mb-3 gap-[22px]">
              <div className="flex flex-col py-3 px-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
                <p className="font-normal text-base"> Name </p>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="font-normal text-xl bg-[#F3F4F6]"
                />
              </div>

              <div className="flex flex-col py-3 px-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
                <p className="font-normal text-base"> Amount </p>
                <input
                  type="number"
                  name="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="₮ 000.00"
                  className="font-normal text-xl bg-[#F3F4F6]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p> Category </p>
                <select
                  className="bg-[#F9FAFB] py-3 px-4 text-base font-normal border border-[#D1D5DB] rounded-lg"
                  onChange={handleCategory}
                >
                  <option defaultChecked> Find or choose category</option>
                  <option value="1" className="px-[18px] py-2 flex gap-3">
                    Food
                  </option>
                  <option value="2"> Home </option>
                  {category?.category?.map((category) => (
                    <option key={category.id} value={category.categoryid}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => handleAdd()}
              type="submit"
              className={`bg-[${buttonColor}] flex items-center justify-center py-2 rounded-3xl text-white`}
              style={{ backgroundColor: buttonColor }}
            >
              Add Record
            </button>
          </div>

          <div className="flex flex-col gap-2 px-6 pb-6 pt-[18px] w-full ">
            <p className="text-[#1F2937]">Description</p>

            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="Write here"
              className="bg-[#F3F4F6] pt-4 pl-4 border border-[#D1D5DB] w-full h-full rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;
