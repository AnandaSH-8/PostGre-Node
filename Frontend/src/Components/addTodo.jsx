import { useState } from "react"
import style from "../Styles/addTodo.module.css"
import { FormControl,FormLabel,Input, Select, Textarea } from "@chakra-ui/react";

export default function CreateTodo(){

    const [formInfo, setFormInfo] = useState({
        title:'',
        description:'',
        status:''
    });

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const payload = formInfo;
            await fetch('http://localhost:3000/addTodo',{
                "method":"POST",
                "headers":{"Content-Type":"application/json"},
                "body":JSON.stringify(payload)
            })
            setFormInfo({title:'', description:'', status:''});
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <h2 className="text-decoration-underline">Add New Todo</h2>
            <FormControl className={style.formStyle} onSubmit={onSubmitForm} isRequired>
                <FormLabel> Title </FormLabel>
                <Input value={formInfo.title} placeholder='Title' 
                onChange={ ({target}) => setFormInfo({...formInfo,title:target.value})}/>

                <FormLabel>Description</FormLabel>
                <Textarea placeholder='Description' value={formInfo.description}
                onChange={({target}) => setFormInfo({...formInfo,description:target.value})}/>

                <FormLabel>Status</FormLabel>
                <Select placeholder='Select Status' value={formInfo.status}
                onChange={ ({target}) => setFormInfo({...formInfo,status:target.value})}>
                    <option value="Todo">Todo</option>
                    <option value="Progress">Progress</option>
                    <option value="Done">Done</option>
                    <option value="Failed">Failed</option>
                </Select>

                <Input type="submit" />
            </FormControl>
        </>
    )
}

