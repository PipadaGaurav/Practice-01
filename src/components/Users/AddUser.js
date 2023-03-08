import React,{useState} from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css'
const AddUser = (props) => {
    const [enteredName,setEnterdName]=useState('');
    const [enteredAge,setEnteredAge]=useState('');
    const [error,setError]=useState();
    const addUserHandler = (event) =>{
        event.preventDefault();
        if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
          setError({
            title: "Inavlid Input",
            message: "Please enter a valid name and age (non-empty value)",
          });
          return;
        }
        if(+enteredAge<1){
            setError({
                title:"Inavlid age",
                message: "Please enter a valid age (>0)"
            });
            return;
        }
        props.onAddUser(enteredName,enteredAge);
        setEnterdName("");
        setEnteredAge("");
    }
    const userNameChangeHandler = (event)=>{
        setEnterdName(event.target.value);
    }
    const ageChangeHandler = (event)=>{
        setEnteredAge(event.target.value);
    }
    const errorhandler =()=>{
        setError(null);
    }
    return (
      <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorhandler}/>}
        <Card className={classes.input}>
          <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              onChange={userNameChangeHandler}
              value={enteredName}
            />
            <label htmlFor="age">Age (Years)</label>
            <input
              id="age"
              type="number"
              onChange={ageChangeHandler}
              value={enteredAge}
            />
            <Button type="submit">Add User</Button>
          </form>
        </Card>
      </div>
    );
};

export default AddUser;