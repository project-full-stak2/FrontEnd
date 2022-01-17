import React,{useState,useEffect} from 'react'
import axios from 'axios';
export default function AdminPage({token}) {
const [users, setUsers] = useState([]);
useEffect(async() => {
    const res = await axios.get("http://localhost:5000/getUsers", {
    headers: {authorization: `Bearer ${token}` },
  });
//   console.log(users);
  setUsers(res.data);
  console.log(res.data);
}, [])


const deleteUsers = async(id,i) => {

    const deletedUs = await axios.delete(`http://localhost:5000/deleteUsers/${id}`,{
        headers:{authorization: "Bearer " + token},
       });
       const copy=[...users];
       copy.splice(i,1)
       setUsers(copy)
// setUsers(deletedUs.data)
}





    return (
        <div>  
         {users.map((elme,i)=>{
return(
    <div>
         <h1>{elme.email}</h1> 
        <h3>{elme.FristName}</h3>
         
        <button className='butt' onClick={()=>{deleteUsers(elme._id,i)}}>removeUser</button>
    </div>
)

         }
       
        
         
         

        )} 
         
        
              
        </div>
    )
}
