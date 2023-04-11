import {MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBBtn} from "mdb-react-ui-kit"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from '../Navbar';

export default function ShowData(){
    const [data, setData] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            await axios.get("http://localhost:4000/bukutamu-api/api/v1/get").then((response)=>{  
            return setData(response.data.data)
            }).catch((err)=>console.log(err))
        }

        fetchData()
    },[data])

    const deleteData = async (id) => {
        await axios.delete(`http://localhost:4000/bukutamu-api/api/v1/${id}/delete`).then((response)=>{
            console.log(response.data)
            return response.data
        }).catch((err)=>console.log(err))
    }

    const showData = ()=>{
        return data.map((row)=>{
            return(
                <tr key={row._id}>
                    <td>{row.email}</td>
                    <td>{row.keperluan}</td>
                    <td><Link to={`/crud/edit/${row._id}`}><MDBBtn size="sm">Edit</MDBBtn></Link> <MDBBtn color="danger" onClick={()=>deleteData(row._id)} size="sm">Delete</MDBBtn></td>
                </tr>
            )
        })    
    }

    return(
        <>
        <Navbar/>
        <MDBContainer>
            <MDBCard>
                <MDBCardHeader>List</MDBCardHeader>
                <MDBCardBody>
                    <Link to={"/crud/add"}><MDBBtn>Add</MDBBtn></Link>
                <table>
                    <tbody>
                        {showData()}
                    </tbody>
                </table>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>      
        </>
    )
}