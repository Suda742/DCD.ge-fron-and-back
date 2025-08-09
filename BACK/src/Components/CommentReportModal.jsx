import React, { useState } from 'react';
import { useStateContext } from '../Contexts/ContextProvider';

function CommentReportModal() {
  const { setModal, storeReport, getAuthUser } = useStateContext();
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    storeReport(reason);
    setModal(prev => ({ ...prev, isOpen: false, type: '', id: null }));
    getAuthUser();
  };

  return (
    <div className="relative z-20">
      {/* Background Overlay */}
      <div
        onClick={() => setModal(prev => ({ ...prev, isOpen: false, type: '', id: null }))}
        className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50 transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-96 max-w-full z-30 transition-all">
        {/* Close Button */}
        <div
          onClick={() => setModal(prev => ({ ...prev, isOpen: false, type: '', id: null }))}
          className="flex justify-end text-2xl cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
        >
          X
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center">
          <label htmlFor="reason" className="text-lg font-semibold text-gray-800">დარეპორტების მიზეზი</label>

          {/* Textarea for Reason */}
          <textarea
            id="reason"
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="h-32 sm:h-40 w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1594D3] transition-all"
            placeholder="აღწერეთ რეპორტის მიზეზი"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mt-4 w-40 mx-auto"
          >
            გასაჩივრება
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentReportModal;
