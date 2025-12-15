export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-8" data-testid="loading-spinner">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  );
};
