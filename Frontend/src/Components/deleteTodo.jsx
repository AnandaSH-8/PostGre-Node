import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { AlertDialog, AlertDialogBody,AlertDialogOverlay, 
    AlertDialogContent,AlertDialogHeader,AlertDialogFooter, Button } from "@chakra-ui/react";
export default function DeleteTodo({itemId,setFunc}){

    const [showConfirm, setShowConfirm] = useState(false);


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

    const PreDeleteItem = () => {
        alert(`IS AT LINE NUMBER 26`)
        setShowConfirm(true)
    }

    useEffect(()=>{
        if(itemId){
            PreDeleteItem()
        }
    })
    
    return(
        <>
           {showConfirm ?  <AlertDialog>
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={DeleteItem} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog> : <></>}
        </>
    )
}

DeleteTodo.propTypes = {
    itemId:PropTypes.number,
    setFunc:PropTypes.func
}