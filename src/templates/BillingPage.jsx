import React, { useEffect, useState } from "react";

const BillingPage = () => {
  const [billingItems, setBillingItems] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [visitTime, setVisitTime] = useState("");

  const [cashAmount, setCashAmount] = useState(0);
  const [upiAmount, setUpiAmount] = useState(0);
  const [billNumber, setBillNumber] = useState("");

  const upiDetails = {
    upiId: "9392208806@ybl",
    payeeName: "Technosports",
    currency: "INR",
  };

  const loadBillingItems = () => {
    const items = JSON.parse(localStorage.getItem("billingItems") || "[]");

    const combined = items.reduce((acc, item) => {
      const existing = acc.find(i => i.model === item.model);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        acc.push({ ...item, quantity: item.quantity || 1 });
      }
      return acc;
    }, []);

    setBillingItems(combined);
    setVisitTime(new Date().toLocaleTimeString());
  };

  const fetchBillNumber = async () => {
    try {
      const res = await fetch(
        "https://techno-backend-idyr.onrender.com/bill/next-bill-number"
      );
      const data = await res.json();
      if (res.ok) setBillNumber(data.billNumber);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBillingItems();
    fetchBillNumber();
  }, []);

  const totalAmount = billingItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalAmount = totalAmount - discountAmount;

  const generateUPIQR = () => {
    const upiURL = `upi://pay?pa=${upiDetails.upiId}&pn=${encodeURIComponent(
      upiDetails.payeeName
    )}&am=${finalAmount.toFixed(2)}&cu=INR`;

    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      upiURL
    )}&size=200x200`;
  };

  const saveBill = async () => {
    if (!billingItems.length) return alert("No items!");
    if (cashAmount + upiAmount !== finalAmount)
      return alert("Payment mismatch!");

    const payload = {
      items: billingItems.map(i => ({
        ...i,
        total: i.price * i.quantity,
      })),
      discountPercent,
      totalAmount,
      discountAmount,
      netAmount: finalAmount,
      visitTime: new Date(),
      payment: { cash: cashAmount, upi: upiAmount },
    };

    const res = await fetch(
      "https://techno-backend-idyr.onrender.com/bill/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Saved!");
      setBillNumber(data.bill.billNumber);
      localStorage.removeItem("billingItems");
      setBillingItems([]);
      setCashAmount(0);
      setUpiAmount(0);
      fetchBillNumber();
    }
  };

  // ✅ CLEAR BILL FUNCTION
  const clearBill = () => {
    if (!window.confirm("Are you sure you want to clear the bill?")) return;

    localStorage.removeItem("billingItems");
    setBillingItems([]);
    setCashAmount(0);
    setUpiAmount(0);
    setDiscountPercent(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-[360px] bg-white rounded-2xl shadow-xl p-4 font-mono text-xs">

        {/* HEADER */}
        <div className="text-center border-b pb-2">
          <h1 className="text-xl font-bold tracking-wide">TECHNOSPORT</h1>
          <p className="text-gray-500">Sportswear Store</p>
          <p className="text-[10px] text-gray-400">Ongole</p>
        </div>

        {/* INFO */}
        <div className="flex justify-between text-[10px] mt-2">
          <span>{new Date().toLocaleDateString()}</span>
          <span>{visitTime}</span>
        </div>

        <div className="flex justify-between text-[10px] mb-2">
          <span>Bill: {billNumber || "--"}</span>
          <span>
            Items: {billingItems.reduce((s, i) => s + i.quantity, 0)}
          </span>
        </div>

        {/* ITEMS HEADER */}
        <div className="grid grid-cols-4 font-bold border-b pb-1 text-[10px]">
          <span>Name</span>
          <span className="text-center">Qty</span>
          <span className="text-right">Price</span>
          <span className="text-right">Total</span>
        </div>

        {/* ITEMS */}
        {billingItems.map((item, i) => (
          <div key={i} className="grid grid-cols-4 py-1 text-[10px]">
            <span>{item.title}</span>
            <span className="text-center">{item.quantity}</span>
            <span className="text-right">₹{item.price}</span>
            <span className="text-right">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        {/* TOTAL */}
        <div className="border-t mt-2 pt-2 space-y-1">
          <div className="flex justify-between">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-sm border-t pt-1">
            <span>Net</span>
            <span>₹{finalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* DISCOUNT */}
        <div className="flex justify-between mt-2">
          <span>Discount %</span>
          <input
            type="number"
            value={discountPercent}
            onChange={e => setDiscountPercent(Number(e.target.value))}
            className="border rounded px-1 w-16 text-right"
          />
        </div>

        {/* PAYMENT */}
        <div className="border-t mt-3 pt-2">
          <div className="font-bold text-center mb-1">Payment</div>

          <div className="flex justify-between mb-1">
            <span>Cash</span>
            <input
              type="number"
              value={cashAmount}
              onChange={e => setCashAmount(Number(e.target.value))}
              className="border w-20 text-right px-1"
            />
          </div>

          <div className="flex justify-between">
            <span>UPI</span>
            <input
              type="number"
              value={upiAmount}
              onChange={e => setUpiAmount(Number(e.target.value))}
              className="border w-20 text-right px-1"
            />
          </div>
        </div>

        {/* QR */}
        <div className="flex flex-col items-center mt-3">
          <img src={generateUPIQR()} alt="QR" className="rounded" />
          <p className="text-[10px] mt-1">
            Pay ₹{finalAmount.toFixed(2)}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-black text-white py-1 rounded"
            >
              Print
            </button>

            <button
              onClick={saveBill}
              className="flex-1 bg-green-600 text-white py-1 rounded"
            >
              Save
            </button>
          </div>

          <button
            onClick={clearBill}
            className="bg-red-600 text-white py-1 rounded"
          >
            Clear Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
