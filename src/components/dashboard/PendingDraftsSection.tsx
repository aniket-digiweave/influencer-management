import React from 'react';

const PendingDraftsSection: React.FC = () => {
  const pendingDrafts = [
    {
      id: '1',
      influencerName: 'Sarah Johnson',
      brandName: 'Nike',
      code: 'INF001',
      date: '2024-01-25'
    },
    {
      id: '2',
      influencerName: 'Mike Chen',
      brandName: 'Adidas',
      code: 'INF002',
      date: '2024-01-26'
    },
    {
      id: '3',
      influencerName: 'Emma Davis',
      brandName: 'Puma',
      code: 'INF003',
      date: '2024-01-27'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-white bg-orange-500 rounded-lg p-4 flex items-center">
          <span className="mr-2">•</span>
          Pending Drafts
        </h3>
        <p className="text-sm text-gray-600 mt-2">Awaiting content from influencers</p>
      </div>
      
      <div className="p-6 space-y-4">
        {pendingDrafts.map((draft) => (
          <div key={draft.id} className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{draft.influencerName}</h4>
              <p className="text-sm text-gray-600">{draft.brandName}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                  {draft.code}
                </span>
                <span className="text-xs text-gray-500">{draft.date}</span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200">
              Remind
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingDraftsSection;