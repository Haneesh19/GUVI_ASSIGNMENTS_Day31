import React,  { useState,useEffect }  from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Topbar from '../components/Topbar'
import { useNavigate } from 'react-router-dom';
import ApiService from '../utils/ApiService';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';


function DashboardAuthor() {

  const [authorData, setAuthorData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getAuthorData()
  },[])

  const getAuthorData = async() => {
    try {
      let res = await ApiService.get('/formik')
      
      if(res.status === 200){
        setAuthorData(res.data)
        toast.success("Author's Data Fetched successfully")
      }
    } catch (error) {
      toast.error("Author's data fetch failed")
    }
  }

  const handleDelete = async(id) => {
    try {
      let res = await ApiService.delete(`/formik/${id}`)
      
      if(res.status === 200){
        getAuthorData();
        toast.success("Author Deleted successfully")
      }
    } catch (error) {
      toast.error("data removal failed")
    }
  }

  return <>
    <Topbar/>
    <Container>
    
      <Row className='d-flex justify-content-start flex-row'>
      <div className='mt-3'>
              <Table striped bordered hover>
                <thead>
                  <tr class="table-danger">
                    <th>S.No</th>
                    <th>Author's Name</th>
                    <th>Author's DOB</th>
                    <th>Author's Bio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody class="table-primary">
                  {
                    authorData.map((e,i)=>{
                      return <>
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{e.name}</td>
                          <td>{e.dob}</td>
                          <td><div style={{width:"300px", overflow:"hidden", whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{e.bio}</div></td>
                          <td>
                            <Button variant='warning' onClick={()=>navigate(`/edit-author/${e.id}`)}>Edit</Button>
                            &nbsp;
                            <Button variant='danger' onClick={()=>{handleDelete(e.id)}}>Delete</Button>
                          </td>
                        </tr>
                      </>
                    })
                  }
                </tbody>
              </Table>
            </div>
      </Row>
    </Container>
    
  </>
}

export default DashboardAuthor;