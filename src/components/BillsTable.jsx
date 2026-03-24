import React from "react";

const BillsTable = ({ bills, highlightToday }) => {
  const todayStr = new Date().toDateString();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Net</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => {
            const isToday =
              new Date(bill.visitTime).toDateString() === todayStr;

            return (
              <tr
                key={bill._id}
                className={`border-t hover:bg-gray-50 transition ${
                  highlightToday && isToday ? "bg-yellow-50" : ""
                }`}
              >
                <td className="p-3">{bill._id}</td>
                <td className="p-3">
                  {new Date(bill.visitTime).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(bill.visitTime).toLocaleTimeString()}
                </td>
                <td className="p-3">₹{bill.totalAmount}</td>
                <td className="p-3 font-semibold text-green-600">
                  ₹{bill.netAmount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BillsTable;