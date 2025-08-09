import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";

function SubscriptionPayment() {
    const { id } = useParams();
    const {setLoader} = useStateContext();
    const [subscription, setSubscription] = useState();

    const [formData, setFormData] = useState({
        cardNumber: '',
        expiredDate: '',
        cvc: '',
    })

    useEffect(() => {
        setLoader(true)
        axiosClient.get(`/subscription/${id}`)
        .then(({data}) => setSubscription(data.data))
        .catch(err => {
            console.log(err);
        })
        .finally(() => setLoader(false));
    }, [])

  return (
    <div className="w-[40vw] mx-auto  mt-40">
      <div className="flex flex-col gap-5">
        <div className="font-bold text-3xl text-center">{subscription?.name} ${subscription?.price}</div>
        <div className="text-xl text-center">{subscription?.description}</div>
      </div>

      <div className="w-[50%] mx-auto mt-5 flex flex-col gap-2">

        <div className="w-full">
            <lable htmlFor="card_number" className="text-xl ">ბარათის ნომერი</lable>
            <input value={formData.cardNumber} onChange={e => setFormData(prev => ({...prev, cardNumber: e.target.value}))} id="card_number" className="w-full p-2 rounded-lg border-2 border-gray-400" type="text" />
        </div>
        <div className="flex justify-between">
            <div className="flex flex-col items-center w-[30%]">
                <lable htmlFor="card_number" className="text-xl text-right">თარიღი</lable>
                <input value={formData.expiredDate} onChange={e => setFormData(prev => ({...prev, expiredDate: e.target.value}))} type="text" className="p-2 rounded-lg border-2 border-gray-400 w-full" />
            </div>

            <div className="flex flex-col items-center w-[30%]">
                <lable htmlFor="card_number" className="text-xl text-right">კოდი</lable>
                <input value={formData.cvc} onChange={e => setFormData(prev => ({...prev, cvc: e.target.value}))} type="text" className="p-2 rounded-lg border-2 border-gray-400 w-full" />
            </div>
        </div>
      </div>
      <div className="w-[50%] mx-auto flex justify-center mt-10">
        <button className="bg-[#1594D3] p-3 rounded-lg w-full text-2xl text-white">ყიდვა</button>
      </div>
      
    </div>
  )
}

export default SubscriptionPayment
