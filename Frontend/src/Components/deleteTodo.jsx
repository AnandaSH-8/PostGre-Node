import { useEffect } from "react"

export default function DeleteTodo({itemId,setFunc}){

    const DeleteItem = async () => {

        try {
            const result = await fetch('http://localhost:3000/deleteTodo/'+itemId,{
                    "method":"DELETE"
                })
        const data = await result.json();
        console.log(data,'IS AT LINE NUMBER 12');
            
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(()=>{
        if(itemId){
            DeleteItem()
        }
        setFunc(false)
    },[itemId])
    
    return(
        <></>
    )
}