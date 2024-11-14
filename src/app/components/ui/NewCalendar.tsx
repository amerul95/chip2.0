// "use client";

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Loader from "./loader";

// export default function DateRangePicker(): JSX.Element {
//   const [dateRange, setDateRange] = useState<[Date | any, Date | any]>([null, null]); // Start and end date
//   const [startDate, endDate] = dateRange;
//   const [loading,setLoading] = useState(false)

//   // Helper to format the date as "YYYY-MM-DD"
//   const formatDate = (date: Date | null) => {
//     if (!date) return "";
//     return date.toISOString().split("T")[0]; // ISO 8601 format, only the date part
//   };

//   const handlerDownload = async (event: React.MouseEvent) => {
//     event.preventDefault(); // Prevent form submission behavior
    

//     if (!startDate || !endDate) {
//       alert("Please select a date range.");
//       return;
//     }

//     const body = JSON.stringify({
//       startDate: formatDate(startDate),
//       endDate: formatDate(endDate),
//     });
//     setLoading(true)
//     try {
//       const response = await fetch("http://chip.bytonbyte.com/api/specificdate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body,
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "data.xlsx"; // Replace with your desired filename
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(url);
//       } else {
//         console.error("Failed to download the file:", response.statusText);
//         alert('Error download')
//       }
//       setLoading(false)
//     } catch (error) {
//       console.error("Error during file download:", error);
//     }
//   };

//   return (
//     <>
//         <div className="flex flex-col space-y-4 relative">
//       <DatePicker
//         selected={startDate}
//         onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
//         startDate={startDate}
//         endDate={endDate}
//         selectsRange
//         placeholderText="Select a date range"
//         isClearable
//         name="date"
//       />

//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handlerDownload}
//       >
//         {loading === true ?
//           <div className='flex space-x-2 justify-center'>
//           <span className='sr-only'>Loading...</span>
//            <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
//          <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
//          <div className='h-2 w-2 bg-black rounded-full animate-bounce'></div>
//        </div>
//           :
//           <p>Download</p>}
//       </button>
//     </div>
//     </>

//   );
// }
