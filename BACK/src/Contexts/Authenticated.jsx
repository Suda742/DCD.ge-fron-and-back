import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "./ContextProvider"
import axiosClient from "../axios-client";
import { useEffect } from "react";

function Authenticated({children}) {
    const {authUser, setAuthUser, getAuthUser, setLoader} = useStateContext();
    const navigate = useNavigate();

useEffect(() => {
  setLoader(true)
  axiosClient.get('/user')
  .then(({data}) => {
    setAuthUser(data.data)
    const user = data?.data
    if(!user) navigate('/login')
    if(user && !user?.verified) navigate('/email-verify') 
    if (authUser && authUser.verified && authUser.type !== 2 && (authUser?.subscriptions?.length === 0 || (authUser?.subscriptions?.length && authUser.subscriptions[authUser.subscriptions.length - 1].status === 0))) navigate('/subscriptions');
    if (authUser && authUser.verified && authUser?.subscriptions && authUser?.subscriptions?.[authUser?.subscriptions?.length - 1]?.status === 1) navigate('/payment/status');
    
  })
  .catch(() => {
    navigate('/login');
  })
  .finally(() => setLoader(false));
}, [])
      
  return (
    <>
      {children}
    </>
  )
}

export default Authenticated