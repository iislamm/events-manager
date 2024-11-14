import React from "react";

const NotFound = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(59, 130, 246), rgb(168, 85, 247))`,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page not found</p>
        <a
          href="/"
          className="px-6 py-3 rounded-lg bg-white text-gray-800 hover:bg-opacity-90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
