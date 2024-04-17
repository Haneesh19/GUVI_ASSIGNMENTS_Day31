import React, { useState } from 'react'
import Topbar from '../components/Topbar'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify';

function AddBook() {
  const navigate = useNavigate()

  let formik = useFormik({
    initialValues:{ 
      title:'',
      author:'',
      isbnNum:'',
      description:'',
      date:''
    },
    validationSchema: Yup.object({
      // title of the book
      title : Yup.string().max(20,'Title cannot exceed 20 characters')
                          .min(3,"Title cannot be shorter than 3 characters")
                          .required("Title cannot be empty"),
      // Author of the book
      author : Yup.string().max(20,'Author cannot exceed 20 characters')
                           .min(3,"Author cannot be shorter than 3 characters")
                           .required("Author cannot be empty"),
      // ISBN number of the book
      isbnNum : Yup.string().matches(/^\d{5}$/,' Enter a valid 5 digit ISBN Number')
                            .required("ISBN Number cannot be empty"),
      // Description of the book                      
      description : Yup.string().max(200,'Description cannot exceed 200 characters')
                                .min(50,"Description cannot be shorter than 50 characters")
                                .required("Description cannot be empty"),
      // Date of the book published                          
      date : Yup.string().required("Date cannot be empty")
    }) ,
    onSubmit : async(values) => {
      
      try {
        let res = await ApiService.post('/formik',values)
        if(res.status === 201){
          navigate('/')
          toast.success("Book Added Successfully")
        }
      } catch (error) {
        toast.error("Failed to create a book")
      }
    }
  })

  return <>
    <Topbar/>
    <div>
      <Container>
        <Form className='mt-5' onSubmit={formik.handleSubmit}>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Title</b></Form.Label>
              <Form.Control type="text" id="title" name="title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} placeholder="Enter Book Title"/>
              {formik.touched.title && formik.errors.title ? (<div style={{color: 'red'}}>{formik.errors.title}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Author</b></Form.Label>
              <Form.Control type="text" id="author" name="author" onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur} placeholder="Enter Author Name"/>
              {formik.touched.author && formik.errors.author ? (<div style={{color: 'red'}}>{formik.errors.author}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>ISBN Number</b></Form.Label>
              <Form.Control type="text" id="isbnNum" name="isbnNum" onChange={formik.handleChange} value={formik.values.isbnNum} onBlur={formik.handleBlur} placeholder="Enter ISBN Number(5 digit)"/>
              {formik.touched.isbnNum && formik.errors.isbnNum ? (<div style={{color: 'red'}}>{formik.errors.isbnNum}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control as="textarea" rows={3} id="description" name="description" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} placeholder='Enter Description'/>
              {formik.touched.description && formik.errors.description ? (<div style={{color: 'red'}}>{formik.errors.description}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Book Published at</b></Form.Label>
              <Form.Control type='date' id="date" name="date" onChange={formik.handleChange} value={formik.values.date} onBlur={formik.handleBlur} placeholder="Enter published date"/>
              {formik.touched.date && formik.errors.date ? (<div style={{color: 'red'}}>{formik.errors.date}</div>) : null}
            </Form.Group>
          </Col>
          <Button variant="primary" type='submit'>Submit</Button>
        </Form>
      </Container>
    </div>
</>
}

export default AddBook;