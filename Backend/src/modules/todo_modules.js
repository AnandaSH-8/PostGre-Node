const pool = require("../../dbConnection");

const todoMethods = {

    addTodos : async (data) => {
        try {
            const {title,description,status} = data;
            const newTodo = await pool.query(
                "INSERT INTO todo (title,description,status) VALUES($1,$2,$3) RETURNING *",
                [title,description,status]
                )
            return newTodo.rows[0];
        } catch (error) {
        console.error(error,'IS AT LINE NUMBER 14');
        }
    },

    getAllTodos : async () => {
        try {
            const result = await pool.query('SELECT * FROM todo');
            return {data:result.rows};
        } catch (error) {
            console.log(error,'IS AT LINE NUMBER 23');
        }
    },
    getTodo : async (data) => {
        try {
            const {id} = data.params;
            const result = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`)
            return result.rows[0];
        } catch (error) {
            console.log(error,'IS AT LINE NUMBER 32');
        }
    },
    
    updateTodo : async (data) => {
        try {
            const {id} = data.params;
            const {title, description, status} = data.body;
            await pool.query(`UPDATE todo SET title = $1,description = $2, status = $3  WHERE todo_id = ${id}`,
                [title, description, status])
            return true;
        } catch (error) {
            console.log(error,'IS AT LINE NUMBER 43');
        }
    },

    deleteTodo : async (data) => {
        try {
            const {id} = data.params;
            await pool.query(`DELETE FROM todo WHERE todo_id = ${id}`)
            return true;
        } catch (error) {
            console.log(error,'IS AT LINE NUMBER 53');
        }
    }
}

module.exports = todoMethods;