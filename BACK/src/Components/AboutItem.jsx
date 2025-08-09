import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function AboutItem({ question, itemNumber, openItem, children }) {
  const isOpen = openItem === itemNumber;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
      >
        <span className="text-lg font-semibold text-gray-800">
          {question}
        </span>
        <span className="text-gray-600">
          {isOpen ? (
            <IoIosArrowUp className="w-5 h-5 transform transition-transform duration-300" />
          ) : (
            <IoIosArrowDown className="w-5 h-5 transform transition-transform duration-300" />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "" : "max-h-0"
        }`}
      >
        <div className="p-5 text-gray-700 bg-white leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AboutItem;