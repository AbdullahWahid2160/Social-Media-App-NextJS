export default function Loading() {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
    <div
      key={num}
      className="bg-white rounded-lg shadow-md p-4 mb-4 mt-24 h-64 animate-pulse"
    >
      <div
        key={num}
        className="bg-gray-300 rounded-lg shadow-md p-4 mb-4 h-56"
      ></div>
    </div>
  ));
}
