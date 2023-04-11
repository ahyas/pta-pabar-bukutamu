import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBInput } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Navbar from '../Navbar';

export default function EditData(){
    const params = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email:"",
        keperluan:""
    })

    useEffect(()=>{
        const fetchData = async () => {
            await axios.put(`http://localhost:4000/bukutamu-api/api/v1/${params.id}/put`).then((response)=>{
                return setForm({email:response.data.data.email, keperluan:response.data.data.keperluan})
            }).catch((err)=>console.log(err))
        }

        fetchData()
    },[params.id])

    const resetValue = (current) => {
        return setForm((prev)=>{
            return {...prev,...current}
        })
    }

    const updateData = async (e) => {
        e.preventDefault()
        await axios.patch(`http://localhost:4000/bukutamu-api/api/v1/${params.id}/update`, form).then((response)=>{
            console.log(response.data.msg)
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
                <MDBCardHeader>Edit data</MDBCardHeader>
                <MDBCardBody>
                    <form onSubmit={updateData}>
                        <MDBInput className="mb-4" label="Email" value={form.email} onChange={(e)=>resetValue({email:e.target.value})}/>
                        <MDBInput className="mb-4" label="Keperluan" value={form.keperluan} onChange={(e)=>resetValue({keperluan:e.target.value})}/>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <MDBBtn type="submit">
                                Update
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