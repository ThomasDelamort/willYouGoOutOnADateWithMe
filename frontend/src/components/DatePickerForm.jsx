import { useState } from "react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TIME_SLOTS = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
];

const isSameDay = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const DatePickerForm = ({ onSubmit }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(new Date(today));
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState("");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];

  const goToMonth = (offset) => setViewDate(new Date(year, month + offset, 1));

  const handleSubmit = () => {
    if (!selected || !time) return;
    onSubmit?.({ date: selected, time });
  };

  return (
    <div className="w-full">
      <p className="text-gray-700 font-medium mb-3">Pick a day</p>

      {/* Calendar card */}
      <div className="border border-gray-200 rounded-2xl p-4 shadow-sm">
        {/* Month header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-pink-100 transition-colors"
            aria-label="Previous month"
          >
            ‹
          </button>
          <span className="font-semibold text-gray-800">
            {MONTHS[month]} {year}
          </span>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-pink-100 transition-colors"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-medium text-gray-400 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`blank-${i}`} />;

            const isPast = day < today;
            const isSelected = isSameDay(day, selected);
            const isToday = isSameDay(day, today);

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={isPast}
                onClick={() => setSelected(day)}
                className={[
                  "h-10 rounded-full text-sm transition-colors",
                  isPast && "text-gray-300 cursor-not-allowed",
                  !isPast && !isSelected && "text-gray-700 hover:bg-pink-100",
                  isSelected &&
                    "bg-linear-to-r from-pink-600 to-pink-400 text-white font-semibold shadow-md",
                  isToday && !isSelected && "ring-1 ring-pink-300",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <p className="text-gray-700 font-medium mt-6 mb-3">What time?</p>
      <div className="grid grid-cols-4 gap-3">
        {TIME_SLOTS.map((slot) => {
          const isSelected = time === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              className={[
                "py-2 rounded-full text-sm border transition-all",
                isSelected
                  ? "bg-linear-to-r from-pink-600 to-pink-400 text-white border-transparent font-semibold shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-pink-300 hover:bg-pink-50",
              ].join(" ")}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      {selected && (
        <p className="text-center text-gray-500 mt-6 text-sm">
          {selected.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
          {time && ` at ${time}`}
        </p>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selected || !time}
        className="mt-4 w-full py-4 font-semibold text-white rounded-3xl bg-linear-to-r from-pink-700 to-pink-400 shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        Set the date ❤️
      </button>
    </div>
  );
};

export default DatePickerForm;
