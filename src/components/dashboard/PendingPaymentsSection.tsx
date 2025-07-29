import React from 'react';

const PendingPaymentsSection: React.FC = () => {
  const pendingPayments = [
    {
      id: '1',
      influencerName: 'Sarah Johnson',
      brandName: 'Nike',
      amount: 250000,
      code: 'INF001'
    },
    {
      id: '2',
      influencerName: 'Emma Davis',
      brandName: 'Puma',
      amount: 180000,
      code: 'INF003'
    },
    {
      id: '3',
      influencerName: 'Mike Chen',
      brandName: 'Adidas',
      amount: 210000,
      code: 'INF004'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-white bg-teal-500 rounded-lg p-4 flex items-center">
          <span className="mr-2">•</span>
          Pending Payments
        </h3>
        <p className="text-sm text-gray-600 mt-2">Outstanding payments to influencers</p>
      </div>
      
      <div className="p-6 space-y-4">
        {pendingPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{payment.influencerName}</h4>
              <p className="text-sm text-gray-600">{payment.brandName}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-bold text-teal-600">₹{payment.amount.toLocaleString()}</span>
                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                  {payment.code}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded transition-colors duration-200">
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingPaymentsSection;