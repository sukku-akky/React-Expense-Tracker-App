import React, { useContext, useEffect, useState } from "react";
import "./Profile.css"
import { AuthContext } from "../store/auth-context";

const Profile=()=>{
    const[error,setError]=useState('');
    const[loading,setLoading]=useState(false)
    const[updateData,setUpdateData]=useState({
        fullName:'',
        url:""
    })

    const handleChange=(e)=>{
        setUpdateData({
            ...updateData,
            [e.target.name]:e.target.value,
        })
    }

    const authCtx=useContext(AuthContext);
    const token=authCtx.token;

    const fetchProfileData = async () => {
        setLoading(true);
        try {
          const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c",
            {
              method: "POST",
              body: JSON.stringify({
                idToken: token
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          
  
          if (!response.ok) {
            throw new Error("Could not fetch profile data.");
          }
  
          const data = await response.json();
          console.log(data);
          const userData = data.users[0];
          
  
          setUpdateData({
            fullName: userData.displayName || "",
            url: userData.photoUrl || ""
          });
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      useEffect(()=>{
        fetchProfileData();

      },[token])
  

    const submitFormHandler=(e)=>{
        e.preventDefault();
        const {fullName,url}=updateData;

        if(!fullName || !url){
            setError('Please fill out all fields.');
            return;
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c",{
            method:"POST",
            body:JSON.stringify({
                idToken:token,
                displayName:updateData.fullName,
                photoUrl:updateData.url,
                returnSecureToken:true,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                
                return res.json();
            } else{
                return res.json().then((data)=>{
                    let errorMessage="update failed";
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message;
                    }
                    alert(errorMessage);

                })
            }
        }).then(data=>{
            console.log(data);
        }) .catch((e)=>{
            console.log(e.message)
        })
    }



    return (
        <>
        <div className="bt-p">
            <h1>Winners never quit,Quitters never win.</h1>
            <button>Your profile is 64% completed.A complete profile has higher chances of landing a job.<span>complete now</span></button>
        </div>
        <hr/>
        <div className="form-dp">
            <div className="form-heading">
                <h1>Contact Details</h1>
                <button className="dp-bt">Cancel</button>
            </div>
            <div className="form-body">
                <form onSubmit={submitFormHandler}>
                    <div className="dp">
                        <label htmlFor="name">Full Name:</label>
                        <input id="name" type="text" name="fullName" value={updateData.fullName} onChange={handleChange}/>
                        <label htmlFor="url">Profile Photo Url:</label>
                        <input id="url" type="text" name="url" value={updateData.url} onChange={handleChange}/>
                    </div>
                    <div className="form-bottom">
                        <button type="submit" className="dp-pt">update</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}

export default Profile;