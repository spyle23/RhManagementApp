export const LeavesSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 