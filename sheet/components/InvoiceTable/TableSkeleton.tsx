const TableSkeleton = () => {
  return (
    <tbody>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-gray-200">
          {/* Checkbox */}
          <td className="">
            <div className="h-4 w-[16px] rounded bg-gray-200" />
          </td>

          {/* ID */}
          <td className="">
            <div className="h-4 w-[60px] rounded bg-gray-200" />
          </td>

          {/* Client */}
          <td className="">
            <div className="mb-1 h-4 w-[160px] rounded bg-gray-200" />
            <div className="h-3 w-[140px] rounded bg-gray-200" />
          </td>

          {/* Total */}
          <td className="">
            <div className="inline-block h-4 w-[100px] rounded bg-gray-200" />
          </td>

          {/* Issued Date */}
          <td className="">
            <div className="inline-block h-4 w-[130px] rounded bg-gray-200" />
          </td>

          {/* Balance */}
          <td className="">
            <div className="inline-block h-4 w-[100px] rounded bg-gray-200" />
          </td>

          {/* Action */}
          <td className="">
            <div className="h-4 w-[70px] rounded bg-gray-200" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
