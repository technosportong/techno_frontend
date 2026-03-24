import React, { useEffect, useState } from "react";
import BillCard from "../components/BillCard";
import BillsTable from "../components/BillsTable";

const BillsListPage = () => {
  const [bills, setBills] = useState([]);
  const [dailyTotals, setDailyTotals] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchBills = async () => {
    const res = await fetch("https://techno-backend-idyr.onrender.com/bill/get");
    const data = await res.json();

    const todayStr = new Date().toISOString().split("T")[0];

    data.sort((a, b) => {
      const aDate = a.visitTime.split("T")[0];
      const bDate = b.visitTime.split("T")[0];

      if (aDate === todayStr && bDate !== todayStr) return -1;
      if (aDate !== todayStr && bDate === todayStr) return 1;

      return new Date(b.visitTime) - new Date(a.visitTime);
    });

    setBills(data);
  };

  const fetchDailyTotals = async () => {
    const res = await fetch("https://techno-backend-idyr.onrender.com/bill/daily-totals");
    const data = await res.json();
    setDailyTotals(data);
  };

  useEffect(() => {
    fetchBills();
    fetchDailyTotals();
  }, []);

  const todayStr = new Date().toDateString();
  const todayBills = bills.filter(
    (bill) => new Date(bill.visitTime).toDateString() === todayStr
  );

  return (
    <div className=" min-h-screen bg-gray-50 font-sans">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">💳 Bills Dashboard</h1>
        <div className="text-sm">
          {currentDate.toLocaleDateString()} <br />
          {currentDate.toLocaleTimeString()}
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-10">

        {/* TODAY CARDS */}
        {todayBills.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Today's Bills
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayBills.map((bill) => (
                <BillCard key={bill._id} bill={bill} />
              ))}
            </div>
          </section>
        )}

        {/* ALL BILLS */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            All Bills
          </h2>
          <BillsTable bills={bills} highlightToday />
        </section>

        {/* DAILY TOTALS */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Daily Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {dailyTotals.map((day) => (
              <div
                key={day._id}
                className="bg-white rounded-2xl shadow-md p-5 border"
              >
                <p className="text-gray-500 text-sm">{day._id}</p>
                <p className="text-lg font-bold text-gray-800">
                  ₹{day.netAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Total: ₹{day.totalAmount}
                </p>
                <p className="text-sm text-blue-500">
                  Bills: {day.billCount}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BillsListPage;