
import { useState,useEffect } from "react"
import style from "../Styles/todoList.module.css"
import { Table, Thead, Tbody, Tr, IconButton,
        Th, Td, TableContainer, Box } from '@chakra-ui/react'
import {DeleteIcon, EditIcon} from '@chakra-ui/icons'



const TodoList = () => {

    const [todoList,setTodoList] = useState([]);
    const [start,setStart] = useState(false);

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

    useEffect( () =>{
        getList()
    },[])

    return (
        <>
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
            <Table variant='striped' colorScheme="orange">
                <Thead background='cyan.50'>
                    <Tr>
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
                                    <Td>{elem.title}</Td>
                                    <Td>{elem.description}</Td>
                                    <Td className={style.statusColumn}>
                                        <Box className={style.statusBox} 
                                        style={{backgroundColor:tableColor(elem.status)}}>{elem.status}</Box>
                                    </Td>
                                    <Td>
                                    <IconButton
                                        isRound={true}
                                        variant='ghost'
                                        colorScheme='green'
                                        fontSize='20px'
                                        aria-label='Edit'
                                        icon={<EditIcon/>}
                                    />
                                    <IconButton
                                        isRound={true}
                                        variant='ghost'
                                        colorScheme='red'
                                        fontSize='20px'
                                        aria-label='Delete'
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

export default TodoList;