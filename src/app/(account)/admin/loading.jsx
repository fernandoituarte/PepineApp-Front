import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductTableSkeleton() {
  const skeletonRowCount = 10;
  const colWidths = [
    "20%",
    "15%",
    "25%",
    "10%",
    "10%",
    "5%",
    "10%",
    "10%",
    "5%",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {colWidths.map((width, index) => (
              <th
                key={index}
                style={{ width: width }}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <Skeleton height={20} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {colWidths.map((width, colIndex) => (
                <td
                  key={colIndex}
                  style={{ width: width }}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {colIndex === 0 ? (
                    <Skeleton height={30} />
                  ) : (
                    <Skeleton height={20} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
