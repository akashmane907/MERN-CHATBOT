import axios from "axios"

export const loginUser = async (email:string,password:string)=>{
    const res = await axios.post("/user/login", { email, password});
    if (res.status!=200){
        throw new Error(res.data.message);
    }
    const data = await res.data;
    return data;

};

export const checkAuthStatus = async()=>{
    const res = await axios.post("/user/auth-status");
    if (res.status!=200){
        throw new Error("unable to authenticate");
    }
    const data = await res.data;
    return data;
}

export const sendChatRequest = async(message:string)=>{
    const res = await axios.post("/chats/new",{ message});
    if (res.status!=200){
        throw new Error("unable to send message");
    }
    const data = await res.data;
    return data;
}