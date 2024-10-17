import { useEffect, useState } from "react";
import axios from "axios";

const Income = (props) => {
  const { color, title, text, description, icon, userid, url } = props;
  const [incomeOrExpense, setIncomeOrExpense] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, { userid: userid });
        if (title === "Your Expense") {
          setIncomeOrExpense(response.data.expense[0].sum);
        } else {
          setIncomeOrExpense(response.data.totalIncome[0].sum);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userid, title, url]);
  console.log(incomeOrExpense);

  return (
    <div className="flex flex-col rounded-xl bg-white w-full">
      <div className="flex gap-2 py-6 pl-6 items-center">
        <div className={`bg-[${color}] w-2 h-2 rounded-full`}></div>
        <p className="font-semibold text-base text-[#0F172A]"> {title} </p>
      </div>
      <div className="flex flex-col py-6 pl-6">
        <p className="font-semibold text-4xl mb-1"> {incomeOrExpense} </p>
        <p className="font-normal text-lg text-[#64748B] mb-4"> {text} </p>
        <div className="flex gap-2 items-center">
          {icon}
          <p className="font-normal text-lg"> {description} </p>
        </div>
      </div>
    </div>
  );
};
export default Income;
