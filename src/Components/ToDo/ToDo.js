import { React, useState, useEffect } from 'react';
import './ToDo.css';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import ToDoModal from './ToDoModal/ToDoModal';


const ToDo = () => {

    let serial = 1;
    const [modal, setModal] = useState(false);
    const [localStore, setLocalStore] = useState([]);


    const handleToDoModalShow = () => setModal(true);
    const handleToDoModalClose = () => setModal(false);


    useEffect(() => {

        let data = localStorage.getItem('ToDo');

        if(data){
            setLocalStore(JSON.parse(data));
        }

    }, []);
    

  return (
      <>
        <section className="todo my-5">
            <Container>
                <Row className="todo-area">
                    <Col md={ 7 }>
                        <Button variant='info' onClick={ handleToDoModalShow }>Add ToDo</Button>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ToDo</th>
                                    <th>Priority</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>


                                {

                                    localStore.map((val, index) => 
                                        <tr>
                                            <td>{ serial++ }</td>
                                            <td>{ val.name }</td>
                                            <td>{ val.priority }</td>
                                            <td>{ val.time }</td>
                                            <td>{ val.date }</td>
                                            <td>
                                                <Button variant='danger'>Delete</Button>
                                            </td>
                                        </tr>

                                    )

                                }
                                


                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <ToDoModal status={modal} closeModal={handleToDoModalClose} autoReload={ setLocalStore }></ToDoModal>
        </section>
      </>
  );
};

export default ToDo;
