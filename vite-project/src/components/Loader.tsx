const Loader = () => {
  return (
    <div
      className={`w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 dark:border-violet-600`}
      aria-label="Loading"
      data-testid="loader"
    ></div>
  );
};

export default Loader;
