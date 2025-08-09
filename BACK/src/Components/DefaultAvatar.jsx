import { FaCameraRotate } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";


function DefaultAvatar({data, openAvatarFilePicker}) {
  const {pathname} = useLocation();

  return (
    <div onClick={openAvatarFilePicker && openAvatarFilePicker} className={`${pathname === '/profile' ? 'w-60 h-60' : 'w-40 h-40'}  lg:w-full lg:h-full mx-auto   rounded-full  text-7xl flex justify-center items-center bg-stone-200`}>
                  <div className="flex flex-col justify-center items-center mb-10 ml-5 relative">
            <div className={`text-[150px] ${pathname === '/profile' ? 'mt-20' : 'mt-10'} mr-5 text-[#0c4c83]`}><FaRegUserCircle /></div>
            {pathname === '/profile' && <div className="text-4xl text-[#1594D3] mr-5"><FaCameraRotate /></div>}
          </div>
    </div>
  )
}

export default DefaultAvatar