import React , {useState , useEffect} from 'react'
import axios from 'axios'



export default function ToDoList({token}) {
const [Todo, setTodo] = useState([])
const [task , setTask] = useState ("")
const [name , setName] = useState ("")

const [nameInput, setNameInput] = useState("")
const [taskInput, setTaskInput] = useState("")
const [togle, setTogle] = useState(false);
const [towTogle, setTowTogle] = useState(false);
const [complete, setComplete] = useState(false)




useEffect(async () => {
  const res = await axios.get("http://localhost:5000/task", {
    headers: {authorization: `Bearer ${token}` },
  });
  console.log(Todo);
  setTodo(res.data);
}, []);
console.log(token);
console.log(task,"hhhhhhh");
console.log(name,"hhhhhhhh");
console.log(Todo);

  const pushTask = async () =>{
    try {
        const result = await axios.post(`http://localhost:5000/task`, {
            newName:name,
            newTask:task,
          },
          {
          headers:{authorization: "Bearer " + token},
          }
          );
          

           setTodo(result.data);
          console.log(result.data);
        
    } catch (error) {
        // console.log(error);
    }
     
  }

  const deletAllTask = async() =>{

    const deleted = await axios.delete(`http://localhost:5000/task`,{
      headers:{authorization: "Bearer " + token},
     });
    //  setTodo(deleted.data);
       const copiedArray = [...task];
       copiedArray.splice(0,task.length);
       setTodo(copiedArray);
     
    
  }


const deletone= async (id)=>{
  const deleted = await axios.delete(`http://localhost:5000/task/${id}`,{
    headers:{authorization: "Bearer " + token},
   });
   setTodo(deleted.data)

}

const updateTask = async (id) => {
  setTogle(false)
  const upTask = await axios.put(`http://localhost:5000/task`,
  {id:id , 
  name:nameInput,
task:taskInput
},

  {headers:{authorization: "Bearer " + token}})

  setTodo(upTask.data)
}


const updatComplete= async (id)=>{
  const result = await axios.put(`http://localhost:5000/task/${id}`,{complete:!complete},
  {id:id , 
    name:nameInput,
  task:taskInput
  },

  {
    headers:{authorization: "Bearer " + token},
    });  
   
    
   console.log(result.data);
     setTodo(result.data)
 
}







///////////////////////////
const changeName = (e) => {
    setName(e.target.value)
}
 const changeTask = (e) => {
     setTask(e.target.value)
 };


const changeTogle= (id,i)=> {
  setTogle(true)
};





const completeTasks = (e) => {
setComplete(e.target.value)
// setComplete(false);
}


    return (
<div>
  
        <div className='div'>
            <p>{Todo.name}</p>
            <input className='input' onChange={(e)=>{changeName(e)}} type="text" placeholder="name" />
            <input className='input' onChange={(e)=>{changeTask(e)}} type="text" placeholder="AddTask" />
            <button className='butt' onClick={(e)=>{pushTask()}} >ADD</button>
            <button className='butt' onClick={()=>{deletAllTask()}} >REMOVE All task</button>
            {/* <input className='input' onChange={(e)=>{completeTasks(e)}} type="checkbox" placeholder="AddTask" /> */}
            </div>
{Todo.map((elme)=> {
return (
  <>
<div className='divv'>
  <h1>{elme.name}</h1>
  <h3>{elme.task}</h3>
  {/* <input className='input' onChange={(e)=>{completeTasks(e)}} type="checkbox" placeholder="AddTask" /> */}
  <h3>{elme.complete}</h3>
  {/* <h3>hhhh{elme.user}</h3> */}
  <button className='butt' onClick={()=>{updatComplete(elme._id,elme.complete)}}>complete</button>
  <button className='butt' onClick={()=>{deletone(elme._id)}}>remove</button>

  
    
    {togle ? <>
      <button className='butt' onClick={()=>{updateTask(elme._id)}} >UpDATETASK</button>
<br />

 <input type="text" placeholder='name' onChange={(e)=> {setNameInput(e.target.value)}}/>
 <br />
 <input type="text" placeholder='task' onChange={(e)=>{setTaskInput(e.target.value)}} />
    </>
    :
    ""
    }

<button className='butshow' onClick={()=>{ setTogle(true)}}>UpDATETASK</button>

  </div>


  </>
)
}

)}           

        </div>
    )
}
