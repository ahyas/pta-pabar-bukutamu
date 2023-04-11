import Navbar from "../Navbar"
import { 
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
    MDBContainer,
    MDBBadge,
    MDBBtn
 } from "mdb-react-ui-kit"

import { useState, useEffect } from "react"
import axios from "axios"

export default function Verifikasi({user}){

    const [table, setTable] = useState([])
    
    useEffect(()=>{
        const fetchData = async () => {
            await axios.get("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/transaction/all").then((response)=>{
                return setTable(response.data)
            }).catch((err)=>console.log(err))
        }
        fetchData()
    },[table])

    const verify = async (id) => {
        const confirm = window.confirm("Anda yakin?")
        if(confirm){
            await axios.patch(`https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/transaction/${id}/verify`).then((response)=>{
                console.log("Berhasil")
                return response.data
            }).catch((err)=>console.log(err))
        }
    }

    const deleteRow = async (id) => {
        const confirm = window.confirm("Anda yakin ingin menghapus data ini?")
        if(confirm){
            await axios.delete(`https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/transaction/${id}/delete`).then((response)=>{
                return response.data
            }).catch((err)=>console.log(err))
        }
    }

    const viewData = () => {
        return table.map((row, key)=>{
            return(
                <MDBListGroupItem className='d-flex justify-content-between align-items-center' key={key}>
                    <div className='d-flex align-items-center'>
                    <img alt="gambar" src={`https://bukutamu.pta-papuabarat.go.id/images/${row.photo}`} style={{filter: "brightness(1.5)", width:"100px"}}/>
                    <div className='ms-3'>
                        <p className="text-muted fw-bold mb-1">ID : {row._id.slice(-4).toUpperCase()}</p>
                        <p className='fw-bold mb-1'>{row.userinfo.nama_depan} {row.userinfo.nama_belakang}</p>
                        <MDBBadge pill color='warning' light>{row.email}</MDBBadge>
                        <p className='text-muted mb-0'>{row.tanggal}</p>
                        <p className='text-muted mb-0'>{row.keperluan}</p>
                        <p>{row.status === 1 ? <MDBBadge pill light color='danger'>Unverified</MDBBadge> : <MDBBadge pill light color='success'>Verified</MDBBadge>}</p>
                        {<MDBBtn onClick={()=>verify(row._id)}>Verify</MDBBtn>} {<MDBBtn className='me-1' color='danger' onClick={()=>deleteRow(row._id)}>Delete</MDBBtn>}
                    </div>
                    </div>
                    
                </MDBListGroupItem>
            )
        })
    }

    return(
        <>
            <Navbar />
            <MDBContainer>
                <MDBCard alignment='left'>
                    <MDBCardHeader><b>Verifikasi buku tamu</b></MDBCardHeader>
                    <MDBCardBody>
                        <MDBListGroup light>
                            {viewData()}
                        </MDBListGroup>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    )
}