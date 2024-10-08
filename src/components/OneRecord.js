import { categoryIconByCategoryName } from "../util/findCategoryIcon";
import { format } from "date-fns";

const OneRecord = (props) => {
  const { time, color, money, categoryname, transactiontype } = props;

  const iconColor = transactiontype === "EXP" ? "#0166FF" : "#FF4545";

  const icon = categoryIconByCategoryName(props);

  return (
    <div className="w-full px-6 py-3 border bg-white border-[#E5E7EB] items-center justify-between flex rounded-xl">
      <div className="flex gap-4">
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-full `}
          style={{
            backgroundColor: iconColor,
          }}
        >
          {icon?.image}
        </div>

        <div className="flex flex-col">
          <p className="font-normal text-base">{categoryname}</p>
          <p className="font-normal text-xs text-[#6B7280]">
            {format(new Date(time), "HH:mm")}
          </p>
        </div>
      </div>
      <p
        className={`font-semibold text-base text-[${color}]`}
        style={{ text: color }}
      >
        {money}
      </p>
    </div>
  );
};

export default OneRecord;
