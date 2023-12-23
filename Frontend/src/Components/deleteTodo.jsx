import { useEffect } from "react"
import PropTypes from 'prop-types';
export default function DeleteTodo({itemId,setFunc}){

    const DeleteItem = async () => {
        try {
            const result = await fetch('http://localhost:3000/deleteTodo/'+itemId,{
                    "method":"DELETE"
                })
        const data = await result.json();
            if(data.code == "deleted"){
                setFunc(-8)
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(()=>{
        if(itemId){
            DeleteItem()
        }
    })
    
    return(
        <></>
    )
}

DeleteTodo.propTypes = {
    itemId:PropTypes.number,
    setFunc:PropTypes.func
}