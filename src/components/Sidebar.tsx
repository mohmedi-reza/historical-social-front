import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subEvents } from "../const/SubEvents";
import Icon from "./icon/icon.component";

const Sidebar: React.FC<{ eventId?: string }> = ({ eventId }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsOpen(!!eventId);
  }, [eventId]);

  if (!eventId) return null;

  const validEventId = eventId || "";
  const allEvents = subEvents[validEventId as keyof typeof subEvents] || [];

  const filteredEvents = allEvents.filter((event) =>
    event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></button>
      )}

      <aside
        className={` fixed top-0 right-0 h-full w-72 bg-gray-900 text-white p-4 border-l border-gray-50/10 flex flex-col transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:relative lg:w-80`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="self-end mb-2 w-6 h-6 text-white rounded-md transition-all lg:hidden"
        >
          <Icon name="close" className="" />
        </button>

        <h2 className="text-lg font-extrabold">رویدادهای مرتبط</h2>

        <input
          type="text"
          placeholder="جستجو..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-2 py-1 border border-gray-700 rounded-xl bg-transparent text-sm sm:text-base text-right text-white placeholder-gray-500 font-extralight focus:outline-none focus:ring-1 focus:ring-gray-400 mt-3"
        />

        <ul className="mt-4 flex-1 overflow-y-auto">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, idx) => (
              <button
                key={idx}
                className="border-b w-full text-start text-sm px-3 rounded-md text-gray-400 hover:text-gray-50 border-gray-800 py-3 hover:bg-white/5 cursor-pointer"
                onClick={() =>
                  navigate(`/event/${eventId}/${allEvents.indexOf(event)}`)
                }
              >
                {event}
              </button>
            ))
          ) : (
            <p className="text-gray-400 mt-4">نتیجه‌ای یافت نشد.</p>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
