import React from "react";

const BillCard = ({ bill }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-gray-400">#{bill._id}</p>
        <span className="text-sm font-medium text-blue-600">
          {new Date(bill.visitTime).toLocaleTimeString()}
        </span>
      </div>

      <div className="mb-2">
        <p className="text-lg font-semibold text-gray-800">
          ₹{bill.netAmount}
        </p>
        <p className="text-sm text-gray-500">
          Total: ₹{bill.totalAmount}
        </p>
      </div>

      <div className="mt-3 border-t pt-3">
        {bill.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm text-gray-600">
            <span>{item.title} x {item.quantity}</span>
            <span>₹{item.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillCard;