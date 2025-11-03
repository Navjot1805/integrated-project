import React from "react";

function NotificationsDropdown({ notifications }) {
  return (
    <div className="absolute top-12 right-16 w-64 bg-white shadow-lg rounded-lg border p-3 z-50">
      <h3 className="font-semibold mb-2">Notifications</h3>
      <ul className="max-h-40 overflow-y-auto text-sm text-gray-700">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <li key={note.id} className="py-1 border-b last:border-none">
              {note.text}
            </li>
          ))
        ) : (
          <li>No notifications</li>
        )}
      </ul>
    </div>
  );
}

export default NotificationsDropdown;
