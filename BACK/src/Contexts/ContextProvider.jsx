import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";
import {toast} from 'react-toastify'

const StateContext = createContext({
    token: null,
    loader: null,
    authUser: null,
    limitedDispatchers: null,
    limitedDrivers: null,
    userDetail: null,
    users: null,
    modal: null,
    confirmModal: null,
    reports: null,
    subscriptions: null,
    features: null,
    authConnects: null,
    setToken: () => {},
    removeToken: () => {},
    setLoader: () => {},
    setAuthUser: () => {},
    getAuthUser: () => {},
    getLimitedDrivers: () => {},
    getLimitedDispatchers: () => {},
    getUserDetails: () => {},
    setUserDetail: () => {},
    getFilteredUser: () => {},
    setModal: () => {},
    setConfirmModal: () => {},
    storeReport: () => {},
    fetchReports: () => {},
    changeReportStatus: () => {},
    deleteRating: () => {},
    getSubscriptions: () => {},
    getFeatures: () => {},
    getAuthConnect: () => {},
    sendConnectRequest: () => {},
    updateConnect: () => {},
    getAuthConnectedData: () => {},

})

export const ContextProvider = ({children}) => {
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [loader, setLoader] = useState(false);
    const [authUser, setAuthUser] = useState(0);
    const [limitedDispatchers, setLimitedDispatchers] = useState([]);
    const [limitedDrivers, setLimitedDrivers] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [features, setFeatures] = useState([]);
    const [authConnects, setAuthConnects] = useState(null);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        type: '',
        text: '',
        method: '',
        value: {},
    });
    const [modal, setModal] = useState({
        isOpen: false,
        type: '',
        id: null,
    })

    function getAuthConnectedData(userId) {
        const authConnectedData = authUser?.connections?.find(
        connect =>
            (connect.status === 2 || connect.status === 3) &&
            (connect.driver_id === Number(userId) || connect.dispatcher_id === Number(userId))
        );

    const shouldShowConnectFunction =
        (authUser?.type === 1) ||
        !authUser?.connections ||
        !authUser?.connections.some(connect => connect.status === 2 || connect.status === 3) ||
        !!authConnectedData;

        return {
        authConnectedData,
        shouldShowConnectFunction
    }
}

    const deleteRating = (id) => {
        setLoader(true);
        axiosClient.delete(`/rating/delete/${id}`)
        .then(() => toast.success('კომენტარი წარმატებით წაიშალა'))
        .finally(() => setLoader(false));
    }

    const fetchReports = () => {
        setLoader(true);
        axiosClient.get('/reports')
        .then(({data}) => setReports(data.data))
        .finally(() => setLoader(false));
    }

    const changeReportStatus = (data) => {
        setLoader(true);
        axiosClient.patch('/report/update', data)
        .then(({data}) => console.log(data))
        .catch(({response}) => toast.error(response.data.message))
        .finally(() => setLoader(false));
    }


    const storeReport = (reason) => {
        setLoader(true)
      const data = {
        rating_id: modal.id,
        reason,
      }  
      
      axiosClient.post('report/store', data)
      .then((d) => console.log('here'))
      .catch(({response}) => console.log(response.message))
      .finally(() => setLoader(false))
    }

    const setToken = (token) => {
        _setToken(token)
        if (token){
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const removeToken = () => {
        localStorage.removeItem("ACCESS_TOKEN")
    }

    function getAuthUser(){
        setLoader(true)
        axiosClient.get('/user')
        .then(({data}) => setAuthUser(data.data))
        .finally(() => setLoader(false));
    }

    function getLimitedDrivers(){
        setLoader(true)
        axiosClient.get(`/users/limited/0`)
        .then(({data}) => setLimitedDrivers(data.data))
        .finally(() => setLoader(false))
    }

    function getLimitedDispatchers(){
        setLoader(true)
        axiosClient.get(`/users/limited/1`)
        .then(({data}) => setLimitedDispatchers(data.data))
        .finally(() => setLoader(false))
    }

    function getUserDetails(id){
        setLoader(true)
        axiosClient.get(`/user/${id}`)
        .then(({data}) => setUserDetail(data.data))
        .finally(() => setLoader(false))
    }

    function getFilteredUser(){
        setLoader(true)
        axiosClient.get('/users')
        .then(({data}) => {
            setUsers(data.data)
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => setLoader(false))
    }

    function getSubscriptions(){
        setLoader(true)
        axiosClient.get('/subscriptions')
        .then(({data}) => setSubscriptions(data.data))
        .catch(err => {
            console.log(err);
        })
        .finally(() => setLoader(false));
    }


    function getFeatures(){
        setLoader(true)
        axiosClient.get('/features')
        .then(({data}) => setFeatures(data.data))
        .catch(err => {
            console.log(err);
        })
        .finally(() => setLoader(false));
    }

    function getAuthConnect() {
        setLoader(true);
        axiosClient.get('/auth/connections')
        .then(({data}) => {
            setAuthConnects(data.data);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => setLoader(false));
    }

    function sendConnectRequest(receiverId) {
        setLoader(true);
        axiosClient.post('/connection/store', {receiver_id: receiverId})
        .then(({data}) => {
            toast.success('ქონექთი გაიგზავნა');
            getAuthUser();
        })
        .catch(({response}) => {
            toast.error('ქონექთი ვერ გაიგზავნა');
        })
        .finally(() => {
            setLoader(false);
        });
    }

    function updateConnect(id, UpdateData) {
        setLoader(true);
        axiosClient.patch(`/connection/update/${id}`, UpdateData)
        .then(({data}) => {
            console.log('datas', data?.data)

            // if (Number(data?.data.status) === 0) {
            //     toast.success('ქონექთი გაუქმებულია');
            // } else if (Number(data?.data.status) === 1) {
            //     toast.success('ქონექთი გაგზავნილია');
            // } else if (Number(data?.data.status) === 2) {
            //     toast.success('ქონექთი მიღებულია');
            // } else if (Number(data?.data.status) === 3) {
            //     toast.success('ქონექთის დასრულების მოთხოვნა გაგზავნილია');
            // } else if (Number(data?.data.status) === 4) {
            //     toast.success('ქონექთი დასრულებულია');
            // }
            getAuthUser();
        })
        .catch(({response}) => {
            console.log(response.data.message);
            toast.error('ქონექთის განახლება ვერ მოხერხდა');
        })
        .finally(() => {
            setLoader(false);
        });

    }



    return <StateContext.Provider value={{
        token,
        loader,
        authUser,
        limitedDispatchers,
        limitedDrivers,
        userDetail,
        users,
        modal,
        confirmModal,
        reports,
        subscriptions,
        features,
        authConnects,
        setToken,
        removeToken,
        setLoader,
        setAuthUser,
        getAuthUser,
        getLimitedDrivers,
        getLimitedDispatchers,
        getUserDetails,
        setUserDetail,
        getFilteredUser,
        setModal,
        setConfirmModal,
        storeReport,
        fetchReports,
        changeReportStatus,
        deleteRating,
        getSubscriptions,
        getFeatures,
        getAuthConnect,
        sendConnectRequest,
        updateConnect,
        getAuthConnectedData,
    }}>
        {children}
    </StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);