import React from "react";
import { X, User, Copy } from "lucide-react";

const DemoPopup = ({ isOpen, onClose, type, onCopyData }) => {
  if (!isOpen) return null;

  const demoData =
    type === "login"
      ? {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        }
      : {
          email: "eve.holt@reqres.in",
          password: "pistol",
        };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleUseData = () => {
    onCopyData(demoData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Demo Account {type === "login" ? "Login" : "Register"}
          </h3>
          <p className="text-gray-600">
            Gunakan kredensial di bawah ini untuk testing
          </p>
        </div>

        {/* Demo Data */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Email:
              </label>
              <button
                onClick={() => handleCopyToClipboard(demoData.email)}
                className="text-xs text-[#4F46E5] hover:text-purple-600 font-medium"
              >
                Copy
              </button>
            </div>
            <p className="text-gray-900 font-mono text-sm bg-white px-3 py-2 rounded-lg border">
              {demoData.email}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password:
              </label>
              <button
                onClick={() => handleCopyToClipboard(demoData.password)}
                className="text-xs text-[#4F46E5] hover:text-purple-600 font-medium"
              >
                Copy
              </button>
            </div>
            <p className="text-gray-900 font-mono text-sm bg-white px-3 py-2 rounded-lg border">
              {demoData.password}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUseData}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white rounded-xl font-medium hover:from-[#4F46E5]/90 hover:to-purple-600/90 transition-all duration-200 shadow-lg"
          >
            Use This Data
          </button>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> Ini adalah akun demo untuk testing purposes.
            Data akan otomatis terisi ke form.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoPopup;
