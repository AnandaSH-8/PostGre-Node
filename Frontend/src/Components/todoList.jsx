
import { useState,useEffect } from "react"
import style from "../Styles/todoList.module.css"

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

    function tableColor(value){

        if(value == 'Todo') return 'table-primary';
        else if(value == 'Done') return 'table-success';
        else if(value == 'Progress') return 'table-warning';
        else return 'table-danger'
    }


    useEffect( () =>{
        getList()
    },[])

    return (
        <>
            <div className={style.refreshRound}></div>
            <h3>- Todo Lists -</h3>
            <table className="table mt-4">
                <thead className="table-info">
                    <tr>
                        <th scope="col"> Id </th>
                        <th scope="col"> Title </th>
                        <th scope="col"> Description </th>
                        <th scope="col"> Status </th>
                    </tr>
                </thead>
                <tbody>
                {
                    todoList?.map((elem,index) =>{
                        return (
                            <tr className={tableColor(elem.status)} scope="row" key={index}>
                                <td>{elem.todo_id}</td>
                                <td>{elem.title}</td>
                                <td>{elem.description}</td>
                                <td>{elem.status}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}

export default TodoList;