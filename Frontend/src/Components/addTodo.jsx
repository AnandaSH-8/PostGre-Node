import { useState } from "react"
import style from "../Styles/addTodo.module.css"

export default function CreateTodo(){

    const [formInfo, setFormInfo] = useState({
        title:'',
        description:'',
        status:''
    });

    const onSubmitForm = async(e) => {
        e.preventDefault();
        console.log(formInfo,'IS AT LINE NUMBER 14');
        // try {
        //     const payload = formInfo;
        //     await fetch('http://localhost:3000/addTodo',{
        //         "method":"POST",
        //         "headers":{"Content-Type":"application/json"},
        //         "body":JSON.stringify(payload)
        //     })
        //     setFormInfo('');
        // } catch (error) {
        //     console.error(error)
        // }

    }

    return (
        <>
            <h2 className="text-decoration-underline">Add New Todo</h2>
            <form className={style.formStyle} onSubmit={onSubmitForm}>
                <input type="text" placeholder="Title" value={formInfo.title} 
                onChange={ ({target}) => setFormInfo({...formInfo,title:target.value})}/>
                <textarea type="search" placeholder="description" value={formInfo.description} 
                    onChange={({target}) => setFormInfo({...formInfo,description:target.value})}/>
                <select name="Status" value={formInfo.status}
                    onChange={ ({target}) => setFormInfo({...formInfo,status:target.value})}>
                    <option value="-">-</option>
                    <option value="Todo">Todo</option>
                    <option value="Progress">Progress</option>
                    <option value="Done">Done</option>
                    <option value="Failed">Failed</option>
                </select>
                <input type="submit" className="btn btn-sm btn-success" 
                value="Submit" />
            </form>
        </>
    )
}

