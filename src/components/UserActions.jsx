import React from "react";
import { Copy, Mail, ExternalLink } from "lucide-react";

const UserActions = ({ user }) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    alert("User ID copied!");
  };

  const handleEmail = () => {
    window.location.href = `mailto:${user.email}`;
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-4">
      <button
        onClick={handleEmail}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        <Mail size={16} />
        Send Email
      </button>

      <button
        onClick={handleCopyId}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 border hover:bg-gray-200 rounded-lg"
      >
        <Copy size={16} />
        Copy ID
      </button>

      <a
        href="https://reqres.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-white border hover:bg-gray-100 rounded-lg"
      >
        <ExternalLink size={16} />
        Visit API
      </a>
    </div>
  );
};

export default UserActions;
