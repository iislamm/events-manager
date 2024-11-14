import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="w-20 h-20 rounded-full border-8 border-blue-200 border-t-blue-600 animate-spin"
        style={{
          background:
            "linear-gradient(to right, rgb(59, 130, 246), rgb(168, 85, 247))",
        }}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
