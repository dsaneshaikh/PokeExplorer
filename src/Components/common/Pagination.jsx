export default function Pagination({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  if (totalPages <= 1) return null;

  const maxVisible = 6;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-8 w-full flex justify-center">
      <div className="flex flex-wrap gap-2 justify-center max-w-full items-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded border text-sm bg-white text-gray-800 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-lg border text-sm ${
              currentPage === pageNum
                ? "bg-[#ef4444] text-white border-[#ef4444]"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded border text-sm bg-white text-gray-800 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
