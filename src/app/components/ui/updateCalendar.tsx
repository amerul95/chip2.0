// "use client";

// import React, { useState } from "react";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   addMonths,
//   subMonths,
// } from "date-fns";

// const UpdateCalendar: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date());

//   // Helpers
//   const monthStart = startOfMonth(currentDate);
//   const monthEnd = endOfMonth(monthStart);
//   const startDate = startOfWeek(monthStart);
//   const endDate = endOfWeek(monthEnd);

//   const handlePrevMonth = (): void => setCurrentDate(subMonths(currentDate, 1));
//   const handleNextMonth = (): void => setCurrentDate(addMonths(currentDate, 1));

//   const renderHeaders = (): JSX.Element => {
//     return (
//       <div className="flex items-center justify-between py-4 px-6 bg-gray-100 border-b">
//         <button
//           onClick={handlePrevMonth}
//           className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//         >
//           &lt;
//         </button>
//         <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
//         <button
//           onClick={handleNextMonth}
//           className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//         >
//           &gt;
//         </button>
//       </div>
//     );
//   };

//   const renderDays = (): JSX.Element => {
//     const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     return (
//       <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 border-t">
//         {weekDays.map((day) => (
//           <div key={day} className="py-2">
//             {day}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderCells = (): JSX.Element => {
//     const rows: JSX.Element[] = [];
//     let days: JSX.Element[] = [];
//     let day: Date = startDate;

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const isCurrentMonth: boolean =
//           format(day, "MM") === format(currentDate, "MM");
//         days.push(
//           <div
//             key={day.toString()}
//             className={`py-4 text-center border cursor-pointer ${
//               isCurrentMonth
//                 ? "bg-white text-gray-800"
//                 : "bg-gray-50 text-gray-400"
//             } hover:bg-gray-100`}
//           >
//             {format(day, "d")}
//           </div>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(
//         <div key={day.toString()} className="grid grid-cols-7">
//           {days}
//         </div>
//       );
//       days = [];
//     }

//     return <div className="border-t">{rows}</div>;
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
//       {renderHeaders()}
//       {renderDays()}
//       {renderCells()}
//     </div>
//   );
// };

// export default UpdateCalendar;
