"use client";
const Loader: React.FC = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 mt-16 h-64">
      <div
        key={num}
        className="bg-gray-300 rounded-lg shadow-md p-4 mb-4 h-56"
      ></div>
    </div>
  ));
};

export default Loader;
