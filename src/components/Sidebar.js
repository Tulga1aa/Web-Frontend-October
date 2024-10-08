import PlusSign from "../../public/icons/PlusSign";
import MyCategories from "./Category";

export const SideBar = ({
  selected,
  categories,
  handleChange,
  handleIncome,
  handleExpense,
  handleAll,
  selectedEyes,
  handleCategory,
  handleAdd,
}) => {
  return (
    <div className="bg-white flex flex-col px-6 py-4 w-[282px] gap-6 rounded-xl h-fit border border-[#E5E7EB]">
      <div className="flex flex-col gap-6">
        <p> Records </p>
        <button
          className="flex gap-1 w-[225px] bg-[#0166FF] rounded-3xl text-white items-center justify-center"
          onClick={handleAdd}
        >
          <PlusSign color="white" /> Add
        </button>
      </div>
      <input
        placeholder="Search"
        className="border border-[#D1D5DB] rounded-lg px-4 py-1"
      />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-base text-[#1F2937] mb-3">Types</p>
        <div className="flex items-center gap-2 px-3 py-1 .5">
          <input
            type="checkbox"
            readOnly
            checked={"All" === selected}
            className="checkbox"
            onClick={() => handleAll()}
          />
          All
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5">
          <input
            type="checkbox"
            readOnly
            checked={"Income" === selected}
            className="checkbox"
            onClick={() => handleIncome()}
          />
          Income
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5">
          <input
            type="checkbox"
            readOnly
            checked={"Expense" === selected}
            className="checkbox"
            onClick={() => handleExpense()}
          />
          Expense
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="font-semibold text-base">Category</p>
          <p className="font-normal text-base opacity-20"> Clear </p>
        </div>
        <div className="flex flex-col gap-2">
          {categories.map((category1, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCategory(selectedEyes[index], index)}
              >
                <MyCategories categoryName={category1} />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 py-1.5 pl-3 items-center">
          <PlusSign color={"#0166FF"} />
          <p>Add category </p>
        </div>
      </div>
    </div>
  );
};
