import { Link } from "react-router-dom"
import UserCardItem from "./UserCardItem"
import { useStateContext } from "../Contexts/ContextProvider";
import { useEffect } from "react";


function DriverDispecher({section, datas}) {
  return (
    <div className="mt-10">    
        <div className="w-[90%] lg:w-full mx-auto">
            {
                section && (
              <div className="my-6 bg-gradient-to-r from-stone-200 to-stone-300 p-5 rounded-xl shadow-lg">
                <div className="text-[#0c4c83] font-bold text-xl lg:text-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <div className="uppercase tracking-wide drop-shadow-md text-base sm:text-xl lg:text-2xl text-center">
                    TOP 10 {section}
                  </div>
                  <Link
                    to={`/filter/users?type=${section === "მძღოლი" ? 0 : 1}`}
                    className="py-2 px-6 bg-[#0c4c83] text-white rounded-lg hover:bg-[#1594D3] transition-all shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto text-center"
                  >
                    იხილე მეტი
                  </Link>
                </div>
              </div>
                )
            }
            <div className="flex justify-normal flex-wrap gap-3 w-[100%]">
            {datas.map(data => (
                <UserCardItem key={data.id} data={data}  />
            ))}

            </div>
        </div>
    </div>
  )
}

export default DriverDispecher