import { useEffect, useState, useRef } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import DriverDispecher from "../Components/DriverDispecher";
import Authenticated from "../Contexts/Authenticated";

function FilterUser() {
  const urlParams = new URLSearchParams(window.location.search);
  let userType = urlParams.get('type');
  
  const { users, getFilteredUser, authUser} = useStateContext();  
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [connectionFilter, setConnectionFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

function handleFilterDatas() {
  let usersData;

  // If logged-in user is admin (type 2), show all users, otherwise filter by userType
  if (authUser?.type === 2) {
    usersData = [...users];
  } else {
    usersData = users.filter(user => user.type === +userType);
  }

  if (connectionFilter !== 'all' && authUser?.connections?.length > 0) {
    if (connectionFilter === 'received') {
      // Requests received by me (I am the receiver, not sender)
      const receivedIds = authUser.connections
        .filter(conn => conn.status === 1 && conn.sender_id !== authUser.id)
        .map(conn => (conn.driver_id === authUser.id ? conn.dispatcher_id : conn.driver_id));
      usersData = usersData.filter(user => receivedIds.includes(user.id));
    } else if (connectionFilter === 'sent') {
      // Requests sent by me (I am the sender)
      const sentIds = authUser.connections
        .filter(conn => conn.status === 1 && conn.sender_id === authUser.id)
        .map(conn => (conn.driver_id === authUser.id ? conn.dispatcher_id : conn.driver_id));
      usersData = usersData.filter(user => sentIds.includes(user.id));
    } else if (connectionFilter === 'connected') {
      // Connected users (status 2 or 3)
      const connectedIds = authUser.connections
        .filter(conn => conn.status === 2 || conn.status === 3)
        .map(conn => {
          if (conn.driver_id === authUser.id) return conn.dispatcher_id;
          if (conn.dispatcher_id === authUser.id) return conn.driver_id;
          return null;
        })
        .filter(Boolean);
      usersData = usersData.filter(user => connectedIds.includes(user.id));
    }
  }

  // Apply name filter if provided
  if (filterInput) {
    usersData = usersData.filter(data => 
      `${data.first_name} ${data.last_name}`.toLowerCase().includes(filterInput.toLowerCase())
    );
  }

  setFilteredUsers(usersData);
}

  useEffect(() => {
    getFilteredUser();
  }, [users.length]);

  useEffect(() => {
    handleFilterDatas();
  }, [filterInput, connectionFilter, users.length, authUser?.connections?.length]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <Authenticated>
    <div className="w-[90vw] max-w-7xl mx-auto mt-28 mb-20">
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-0 justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            {+authUser?.type === 2 ? 'ყველა': +userType === 0 ? 'მძღოლები' : 'დისპეჩერები'}
          </h1>
          
          <div className="flex items-center gap-4 flex-col-reverse md:flex-row">

            <div className="relative w-full md:w-48">
            {/* Dropdown Button */}
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <span className="text-gray-700">
                {connectionFilter === 'all' && 'ყველა'}
                {connectionFilter === 'sent' && 'გაგზავნილი'}
                {connectionFilter === 'received' && 'მიღებული'}
                {connectionFilter === 'connected' && 'დაკავშირებული'}
              </span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                ref={dropdownRef}
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setConnectionFilter('all');
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left ${connectionFilter === 'all' ? 'bg-blue-50 text-[#1594D3]' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    ყველა
                  </button>
                  <button
                    onClick={() => {
                      setConnectionFilter('sent');
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left ${connectionFilter === 'sent' ? 'bg-blue-50 text-[#1594D3]' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    გაგზავნილი
                  </button>
                  <button
                    onClick={() => {
                      setConnectionFilter('received');
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left ${connectionFilter === 'received' ? 'bg-blue-50 text-[#1594D3]' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    მიღებული
                  </button>
                  <button
                    onClick={() => {
                      setConnectionFilter('connected');
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left ${connectionFilter === 'connected' ? 'bg-blue-50 text-[#1594D3]' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    დაკავშირებული
                  </button>
                </div>
              </div>
            )}
          </div>
          
            <div className="relative w-full lg:w-80">

            <input
              type="text"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg outline-none 
              focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200 text-gray-700 
              placeholder-gray-400"
              placeholder="ძებნა..."
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {filteredUsers.length > 0 ? (
          <DriverDispecher datas={filteredUsers} />
        ) : (
          <div className="text-center text-gray-600 text-lg py-10 bg-white rounded-xl shadow-md">
            მომხმარებლები ვერ მოიძებნა
          </div>
        )}
      </div>
    </div>
    </Authenticated>
  );
}

export default FilterUser;