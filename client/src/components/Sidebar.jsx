import { useState } from "react";

export default function Sidebar({setShowCreateElementContext}) {



  const items1 = ["Hero", "Features", "Testimonials", "Pricing", "Footer"];
  const items2 = ["Text Block", "Image", "Button", "Card"];


  const addElem = () => {

  }

  return (
    <aside className="w-64 h-full border-r bg-gray-50 p-4 space-y-6">

      <div>
        <h2 className="font-bold mb-3">Sections</h2>
        <button
        onClick={()=>setShowCreateElementContext(true)}
        className="w-full py-2 bg-orange-300 mb-2">New Element +</button>
        <ul className="space-y-2 text-sm">
          {items1.map((item) => (
            <li
              key={item}
              className="p-2 bg-white border rounded cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-bold mb-3">General</h2>
        <ul className="space-y-2 text-sm">
          {items2.map((item) => (
            <li
            onClick={addElem}
              key={item}
              className="p-2 bg-white border rounded cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
}
