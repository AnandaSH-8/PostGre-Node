
import { useState,useEffect } from "react"
import style from "../Styles/todoList.module.css"
import { Table, Thead, Tbody, Tr, IconButton,
        Th, Td, TableContainer, Box, Input, 
        Select, Alert, AlertIcon, CloseButton } from '@chakra-ui/react'
import {DeleteIcon, EditIcon, CheckIcon, SmallCloseIcon} from '@chakra-ui/icons'
import PropTypes from "prop-types"


const TodoList = ({receiveDelete,getTodoList,setFunc}) => {

    const [todoList,setTodoList] = useState([]);
    const [start,setStart] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [editedData, setEditedData] = useState({
        title:'',
        description:'',
        status:''
    });
    const [alert,setAlert] = useState({
        show:false, isSuccess:false
    })

    const getList = async () => {

       try {
        setStart(true)
        const time = setTimeout(async ()=>{
            const result = await fetch('http://localhost:3000/getTodos');
            const {data} = await result.json()
            setTodoList(data);
            clearTimeout(time)
            setStart(false)
        },500)
       } catch (error) {
        console.error(error);
       }
    }

    const editTodo = (data) => {
        setEditedData(data);
        setIsEdit(true);
    }

    const updateTodo = async({todo_id,title,description,status}) =>{
       
        try {
            if(editedData.title !== title || editedData.description !== description 
                || editedData.status !== status){
                await fetch('http://localhost:3000/updateTodo/'+todo_id,{
                    "method":"PUT",
                    "headers":{"Content-Type":"application/json"},
                    "body":JSON.stringify(editedData)
                })
                setIsEdit(false);
                setAlert({show:true, isSuccess:true})
            }
            else{
                setIsEdit(false)
            }
        } catch (error) {
            setAlert({show:true, isSuccess:false})
        }
    }

    function tableColor(value){

        if(value == 'Todo') {
            return 'deepskyblue'
        }
        else if(value == 'Done'){
            return 'seagreen'
        }
        else if(value == 'Progress') {
            return 'gold';
        }
        else {
            return 'crimson';
        }
    }

   useEffect(()=>{
        if(getTodoList){
            getList()
            setFunc(false);
        }
   },[getTodoList])

    useEffect( () =>{
        getList()
    },[])

    return (
        <>
            {alert.show ? <Alert status='success' variant='solid'
                position="absolute"
                className={style.chakraAlert}>
                <AlertIcon />
                {editedData.title} updated successfully!

                <CloseButton
                    alignSelf='flex-start'
                    position='absolute'
                    right={-1}
                    top={-1}
                    onClick={() => {getList(); setAlert({...alert,show:false})}}
                />
            </Alert> : '' }
            <Box bg='tomato' color='white' display='flex' p='1'>
                <Box w='20%' textAlign='left' p="1">
                   <Box onClick={getList} className={start ? style.spinRefresh : style.roundRefresh}>
                        <p>Refresh</p>
                    </Box>
                </Box>
                <Box w="60%">
                    <h3>- Todo Lists -</h3>
                </Box>
            </Box>
        <TableContainer>
            <Table variant='striped' colorScheme="orange" className={style.chakraTable}>
                <Thead background='cyan.50'>
                    <Tr >
                        <Th> Id </Th>
                        <Th> Title </Th>
                        <Th> Description </Th>
                        <Th> Status </Th>
                        <Th> Actions</Th>
                    </Tr>
                </Thead>
                <Tbody className={style.chakraTbody}>
                    {  todoList?.map((elem,index) =>{
                            return (
                                <Tr color='black' key={index}>
                                    <Td>{elem.todo_id}</Td>
                                    <Td>
                                        {isEdit ? 
                                        <Input onInput={({target}) => setEditedData({...editedData,title:target.value})} 
                                        value={editedData.title} bg="white"/>
                                        : elem.title}
                                    </Td>
                                    <Td>
                                        {isEdit ? 
                                        <Input onInput={({target}) => setEditedData({...editedData,description:target.value})} 
                                        value={editedData.description} bg="white"/>
                                        : elem.description
                                        }
                                    </Td>
                                    <Td className={style.statusColumn}>
                                    {   isEdit ? 
                                        <Select value={editedData.status} bg="white"
                                            onChange={ ({target}) => setEditedData({...editedData,status:target.value})}>
                                            <option value="Todo">Todo</option>
                                            <option value="Progress">Progress</option>
                                            <option value="Done">Done</option>
                                            <option value="Failed">Failed</option>
                                        </Select>
                                        : <Box className={style.statusBox} 
                                            style={{backgroundColor:tableColor(elem.status)}}>{elem.status}</Box>
                                        }
                                    </Td>
                                    <Td>
                                    { isEdit ? <>
                                         <IconButton
                                            isRound={true}
                                            variant='ghost'
                                            colorScheme='green'
                                            fontSize='15px'
                                            aria-label='Save'
                                            onClick={() => updateTodo(elem)}
                                            icon={<CheckIcon/>}
                                        />
                                         <IconButton
                                            isRound={true}
                                            variant='ghost'
                                            colorScheme='red'
                                            fontSize='20px'
                                            aria-label='Cancel'
                                            onClick={()=>setIsEdit(false)}
                                            icon={<SmallCloseIcon/>}
                                        />
                                     </> : 
                                        <IconButton
                                            isRound={true}
                                            variant='ghost'
                                            colorScheme='green'
                                            fontSize='20px'
                                            aria-label='Edit'
                                            onClick={()=>editTodo(elem)}
                                            icon={<EditIcon/>}
                                        />
                                    }
                                    
                                    <IconButton
                                        isRound={true}
                                        variant='ghost'
                                        colorScheme='red'
                                        fontSize='20px'
                                        aria-label='Delete'
                                        onClick={ () => receiveDelete(elem.todo_id)}
                                        icon={<DeleteIcon/>}
                                    />
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
        </>
    )
}

TodoList.propTypes = {
    receiveDelete : PropTypes.func,
    getTodoList: PropTypes.bool,
    setFunc: PropTypes.func
}

export default TodoList;