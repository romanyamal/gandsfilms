import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import { generateDate, months } from "../utils/GenerateDate";
import cn from "../utils/cn";

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export const DatePicker = ({ onDateSelect }) => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  // Only re-calculate dates when the month/year changes
  const dates = useMemo(
    () => generateDate(today.month(), today.year()),
    [today]
  );

  return (
    <div className="border p-3 rounded-xl border-transparent bg-gray-500 text-white">
      {/* Header with month and controls */}
      <div className="flex justify-between items-center px-2 pb-3">
        <span className="font-semibold text-base text-md sm:text-lg">
          {months[today.month()]}, {today.year()}
        </span>
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setToday(today.subtract(1, "month"))}
            aria-label="Previous month"
            className="hover:text-gray-800 cursor-pointer"
          >
            &lsaquo;
          </button>
          <button
            type="button"
            onClick={() => setToday(currentDate)}
            className="hover:text-gray-800 cursor-pointer"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setToday(today.add(1, "month"))}
            aria-label="Next month"
            className="hover:text-gray-800 cursor-pointer"
          >
            &rsaquo;
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-2 text-xs sm:text-sm font-semibold text-center text-gray-200">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-xs sm:text-sm">
        {dates.map(({ date, currentMonth, today: isToday }, index) => (
          <div key={index} className="h-10 grid place-content-center border-t">
            <button
              type="button"
              title={`Select ${date.format("MM/DD/YYYY")}`}
              aria-label={`Select ${date.format("MM/DD/YYYY")}`}
              onClick={() => onDateSelect(date)}
              className={cn(
                currentMonth ? "" : "text-gray-800",
                isToday ? "bg-red-600 text-white" : "",
                "h-7 w-7 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer"
              )}
            >
              {date.date()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
