// import { useState } from "react";
// import React from "react";

// interface SimpleEventData {
//   type: string;
//   timeStamp: number;
//   button: number;
//   clientX: number;
//   clientY: number;
//   targetHTML: string;
// }

// export default function EventObject() {
  
//   const [eventData, setEventData] = useState<SimpleEventData | null>(null);

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const simpleEventData: SimpleEventData = {
//       type: e.type,
//       timeStamp: e.timeStamp,
//       button: e.button,
//       clientX: e.clientX,
//       clientY: e.clientY,
//       targetHTML: (e.target as HTMLButtonElement).outerHTML,
//     };
//     setEventData(simpleEventData);
//   };

//   return (
//     <div>
//       <h2>Event Object</h2>
//       <button
//         onClick={handleClick}
//         className="btn btn-primary"
//         id="wd-display-event-obj-click"
//       >
//         Display Event Object
//       </button>
//       <pre>{JSON.stringify(eventData, null, 2)}</pre>
//       <hr />
//     </div>
//   );
// }