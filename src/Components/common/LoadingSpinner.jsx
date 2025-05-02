// src/components/common/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
