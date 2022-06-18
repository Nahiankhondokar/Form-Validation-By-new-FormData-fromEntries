import React from 'react';
import './ToDoModal.css';
import { CloseButton, Form, Modal, Button } from 'react-bootstrap';

const ToDoModal = (props) => {


    // Key Checking of LocalStorage
    const getLSData = (key) => {

        let data = localStorage.getItem(key);

        if(data){
            return JSON.parse(data);
        }else{
            return false;
        }

    }

    // Set LocalStorage Data
    const setLSData = (key, val) => {

        let data = JSON.stringify(val);
        localStorage.setItem(key, data);

    }


    // Form Submit Function
    const handleToDoForm = (e) => {
        e.preventDefault();

        let form_data = new FormData(e.target);
        let data = Object.fromEntries(form_data.entries());


        let to_do_arr;
        if(getLSData('ToDo')){
            to_do_arr = getLSData('ToDo');
        }else{
            to_do_arr = [];
        }

        to_do_arr.push({
            name : data.todo,
            priority : data.priority,
            date : data.date,
            time : data.time
        });

        setLSData('ToDo', to_do_arr);
        props.closeModal();

        props.autoReload(getLSData('ToDo'));

    }

  return (
      <>
        <Modal show={props.status} onSubmit={ handleToDoForm } onHide={ props.closeModal }>
            <Modal.Header>
                <h3>Add ToDo List</h3>
                <CloseButton onClick={ props.closeModal }></CloseButton>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group>
                        <Form.Label>ToDo Name</Form.Label>
                        <Form.Control name="todo"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>ToDo Priority</Form.Label>
                        <select className="form-control" name="priority">
                            <option value="">- Select -</option>
                            <option value="Important">Important</option>
                            <option value="Less Important">Less Important</option>
                            <option value="Ignore">Ignore</option>
                        </select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>ToDo Date</Form.Label>
                        <input type="date" className='form-control' name="date" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>ToDo Time</Form.Label>
                        <input type="time" className='form-control' name="time" />
                    </Form.Group>

                    <Button type='submit' variant='info' className='mt-3'>Submit</Button>

                </Form>
            </Modal.Body>
        </Modal>
      </>
  );
};

export default ToDoModal;
