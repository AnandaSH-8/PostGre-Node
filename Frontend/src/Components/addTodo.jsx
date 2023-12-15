import { useState } from "react"

export default function CreateTodo(){

    const [description, setDescription] = useState('');

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const payload = {description};
            await fetch('http://localhost:3000/addTodo',{
                "method":"POST",
                "headers":{"Content-Type":"application/json"},
                "body":JSON.stringify(payload)
            })
            setDescription('');
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <h2 className="text-decoration-underline">Add New Todo</h2>
            <form className="mt-4" onSubmit={onSubmitForm}>
                <input type="text" value={description} onChange={({target}) => setDescription(target.value)}/>
                <input type="submit" className="btn-sm btn-success" value="Submit" />
            </form>
        </>
    )
}

