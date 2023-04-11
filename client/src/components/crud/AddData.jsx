import {  
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBCard, MDBCardHeader, MDBCardBody
  } from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

export default function AddData(){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email:"",
        keperluan:""
    })

    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev, ...current}
        })
    }

    const submitForm = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:4000/bukutamu-api/api/v1/post", {email:form.email, keperluan:form.keperluan, status:"", photo:"", tanggal:""}).then((response)=>{
            console.log(response.data)
            return navigate("/crud")
        }).catch((err)=>console.log(err))
    }

    const cancel = () => {
        return navigate("/crud")
    }

    return(
        <>
        <Navbar/>
        <MDBContainer>
            <MDBCard>
                <MDBCardHeader>Add Data</MDBCardHeader>
                <MDBCardBody>
                    <form onSubmit={submitForm}>
                        <MDBInput className='mb-4' label="Email" value={form.email} onChange={(e)=>resetValue({email:e.target.value})} />
                        <MDBInput className='mb-4' label="Keperluan" value={form.keperluan} onChange={(e)=>resetValue({keperluan:e.target.value})} />
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <MDBBtn type='submit' block>
                                Submit
                            </MDBBtn>
                            <MDBBtn color='danger' onClick={cancel}>
                                Cancel
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
        </>
    )
}