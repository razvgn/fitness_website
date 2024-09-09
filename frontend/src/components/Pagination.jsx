import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  const maxPageDisplay = 5;

  const startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
  const endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-cyan-500 text-white hover:bg-cyan-600"
        }`}
      >
        Anterior
      </button>

      {pageNumbers.map((number, index) =>
        number === "..." ? (
          <span key={index} className="px-4 py-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded ${
              currentPage === number
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        )
      )}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-cyan-500 text-white hover:bg-cyan-600"
        }`}
      >
        Următor
      </button>
    </div>
  );
};

export default Pagination;
