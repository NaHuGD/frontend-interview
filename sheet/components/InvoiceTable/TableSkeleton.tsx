const TableSkeleton = () => {
  return (
    <tbody>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="h-12.5 animate-pulse border-b border-gray-200">
          {/* Checkbox */}
          <td className="h-10.5 w-10.5 py-1 pl-2">
            <div className="h-4.5 w-4.5 rounded bg-gray-200" />
          </td>

          {/* ID */}
          <td>
            <div className="ml-5 h-4 w-15 rounded bg-gray-200" />
          </td>

          {/* Client */}
          <td>
            <div className="ml-5 flex space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="flex flex-col">
                <div className="mb-1 h-5 w-29 rounded bg-gray-200" />
                <div className="h-4.5 w-38 rounded bg-gray-200" />
              </div>
            </div>
          </td>

          {/* Total */}
          <td>
            <div className="ml-5 inline-block h-5 w-11 rounded bg-gray-200" />
          </td>

          {/* Issued Date */}
          <td>
            <div className="ml-5 inline-block h-5 w-21 rounded bg-gray-200" />
          </td>

          {/* Balance */}
          <td>
            <div className="flex h-full w-full items-center justify-center">
              <div className="mr-5 inline-block h-6 w-12 rounded bg-gray-200" />
            </div>
          </td>

          {/* Action */}
          <td>
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-6 w-22 rounded bg-gray-200" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
