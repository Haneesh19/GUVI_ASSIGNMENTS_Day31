import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';
import ApiService from '../utils/ApiService';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

function DashboardBook() {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    try {
      let res = await ApiService.get('/formik');
      if (res.status === 200) {
        toast.success("Books fetched successfully")
        setBookData(res.data);
      }
    } catch (error) {
      toast.error('Data fetch failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await ApiService.delete(`/formik/${id}`);
      if (res.status === 200) {
        getBookData();
        toast.success("Book Data deleted")
      }
    } catch (error) {
      toast.error('Data removal failed');
    }
  };

  return (
    <>
      <Topbar /><br/>
     
      <Container >  
      <div>
      <Table striped bordered hover>
        <thead>
          <tr class="table-danger">
            <th>S.no</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN Number</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="table-primary">
          {
            bookData.map((e,i)=>{
              return <tr key={i}>
                <td>{i+1}</td>
                <td>{e.title}</td>
                <td>{e.author}</td>
                <td>{e.isbnNum}</td>
                <td >
                  <div style={{width:"300px", overflow:"hidden", whiteSpace:"nowrap",textOverflow:"ellipsis"}}>
                    {e.description}
                  </div>
                </td>
                <td>{e.date}</td>
                <td>
                  <Button variant="warning" onClick={()=>navigate(`/edit-book/${e.id}`)}>Edit</Button>
                  &nbsp;
                  <Button variant="danger" onClick={()=>handleDelete(e.id)}>Delete</Button>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
      </div>
      </Container>

    </>
  );
}

export default DashboardBook;