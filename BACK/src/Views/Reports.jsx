import { useEffect, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import Authenticated from "../Contexts/Authenticated";

function Reports() {
  const { fetchReports, reports, setConfirmModal } = useStateContext();
  const [filter, setFilter] = useState({
    sender_name: '',
    receiver_name: '',
    status: 1,
  });
  const [filteredReports, setFilteredReports] = useState([...reports]);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (!reports || reports.length === 0) return;

    let filtered = reports;

    filtered = filtered.filter(rep => {
      const senderName = `${rep?.rating?.userFrom?.first_name} ${rep?.rating?.userFrom?.last_name}`.toLowerCase();
      const receiverName = `${rep?.rating?.userTo?.first_name} ${rep?.rating?.userTo?.last_name}`.toLowerCase();

      const senderMatches = senderName.includes(filter.sender_name?.toLowerCase() || "");
      const receiverMatches = receiverName.includes(filter.receiver_name?.toLowerCase() || "");

      return (
        rep.status === filter.status && (senderMatches && receiverMatches)
      );
    });

    setFilteredReports(filtered);
  }, [reports, filter]);

  return (
    <Authenticated>
      <div className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-6">
          <div className="w-full sm:w-[48%] flex flex-col gap-3">
            <label htmlFor="sender_name_filter" className="text-sm font-semibold text-gray-600">გამგზავნის სახელი</label>
            <input
              value={filter.sender_name}
              onChange={(e) => setFilter(prev => ({ ...prev, sender_name: e.target.value }))}
              id="sender_name_filter"
              type="text"
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1594D3] w-full shadow-md transition duration-200 ease-in-out"
              placeholder="გამგზავნის სახელი"
            />
          </div>
          <div className="w-full sm:w-[48%] flex flex-col gap-3">
            <label htmlFor="receiver_name_filter" className="text-sm font-semibold text-gray-600">მიმღების სახელი</label>
            <input
              value={filter.receiver_name}
              onChange={(e) => setFilter(prev => ({ ...prev, receiver_name: e.target.value }))}
              id="receiver_name_filter"
              type="text"
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1594D3] w-full shadow-md transition duration-200 ease-in-out"
              placeholder="მიმღების სახელი"
            />
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
            <button
              className={`py-2 px-6 rounded-lg border-2 transition-colors duration-200 ease-in-out ${filter.status === 1 ? 'bg-[#1594D3] text-white' : 'border-[#1594D3] text-[#1594D3] hover:bg-[#1594D3] hover:text-white'}`}
              onClick={() => setFilter(prev => ({ ...prev, status: 1 }))}
            >
              აქტიური
            </button>
            <button
              className={`py-2 px-6 rounded-lg border-2 transition-colors duration-200 ease-in-out ${filter.status === 2 ? 'bg-[#1594D3] text-white' : 'border-[#1594D3] text-[#1594D3] hover:bg-[#1594D3] hover:text-white'}`}
              onClick={() => setFilter(prev => ({ ...prev, status: 2 }))}
            >
              დატოვებული
            </button>
            <button
              className={`py-2 px-6 rounded-lg border-2 transition-colors duration-200 ease-in-out ${filter.status === 0 ? 'bg-[#1594D3] text-white' : 'border-[#1594D3] text-[#1594D3] hover:bg-[#1594D3] hover:text-white'}`}
              onClick={() => setFilter(prev => ({ ...prev, status: 0 }))}
            >
              გაუქმებული
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto border-t-2 border-gray-300">
          <div className="hidden sm:grid grid-cols-5 gap-4 bg-gray-100 text-xl font-semibold text-gray-700 p-4">
            <div>გამგზავნი</div>
            <div>მიმღები</div>
            <div>კომენტარი</div>
            <div>დარეპორტების მიზეზი</div>
            <div>მოქმედება</div>
          </div>

          {filteredReports?.map(report => (
            <div key={report.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg p-4 border-2 sm:border-b-2 border-gray-500 bg-white gap-4 sm:gap-0">
              {/* Sender */}
              <div className="w-full sm:w-[20%] flex flex-col mb-4 sm:mb-0">
                <div className="flex gap-2 justify-center sm:justify-start">
                  <span>{report?.rating?.userFrom?.first_name}</span> <span>{report?.rating?.userFrom?.last_name}</span>
                </div>
                <div className="flex justify-center sm:justify-start text-sm text-gray-600">{report?.rating?.userFrom?.phone}</div>
              </div>

              {/* Receiver */}
              <div className="w-full sm:w-[20%] flex flex-col mb-4 sm:mb-0">
                <div className="flex gap-2 justify-center sm:justify-start">
                  <span>{report?.rating?.userTo?.first_name}</span> <span>{report?.rating?.userTo?.last_name}</span>
                </div>
                <div className="flex justify-center sm:justify-start text-sm text-gray-600">{report?.rating?.userTo?.phone}</div>
              </div>

              {/* Comment */}
              <div className="w-full sm:w-[20%] text-sm mb-4 sm:mb-0">{report?.rating?.comment}</div>

              {/* Reason */}
              <div className="w-full sm:w-[20%] text-sm mb-4 sm:mb-0">{report?.reason}</div>

              {/* Actions */}
              <div className="w-full sm:w-[20%] flex gap-6 sm:gap-4 justify-center sm:justify-start">
                {filter.status !== 2 && (
                  <div
                    className="bg-[#1594D3] p-3 text-white rounded-lg cursor-pointer hover:bg-[#0c4c83] transition"
                    onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: true, type: 'changeStatus', method: 'update', text: 'ნამდვილად გსურთ კომენტარის დატოვება ?', value: { id: report?.id, status: 2 } }))}
                  >
                    <FaCheck />
                  </div>
                )}
                {filter.status !== 0 && (
                  <div
                    className="bg-red-500 p-3 text-white rounded-lg cursor-pointer hover:bg-red-600 transition"
                    onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: true, type: 'changeStatus', method: 'update', text: 'ნამდვილად გსურთ რეპორტის უარყოფა ?', value: { id: report?.id, status: 0 } }))}
                  >
                    <FaRegTrashCan />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Authenticated>
  );
}

export default Reports;
