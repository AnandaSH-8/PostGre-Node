
import { useState,useEffect } from "react"

const TodoList = () => {

    const [todoList,setTodoList] = useState([]);

    const getList = async () => {

       try {
         const result = await fetch('http://localhost:3000/getTodos');
         const {data} = await result.json()
         
         setTodoList(data);
       } catch (error) {
        console.error(error);
       }
    }


    useEffect( () =>{
        getList()
    },[])

    return (
        <>
        <div className="container w-25 mt-3 text-start">
         {
            todoList?.map((elem,index) =>{
                return (
                    <div key={index}>
                        <h6 >{elem.description}</h6>
                    </div>
                )
            })
         }
        </div>
        </>
    )
}

export default TodoList;