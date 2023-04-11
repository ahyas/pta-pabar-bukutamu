import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBadge, MDBCard, MDBCardHeader, MDBCardBody, MDBListGroup, MDBListGroupItem, MDBCardText } from "mdb-react-ui-kit";
import axios from "axios";
import Navbar from "../Navbar";


export default function ListBukuTamu({user}){
    const [list, setList] = useState([])
    const [userInfo, setuserInfo] = useState({
        nama_depan:"",
        nama_belakang:"",
        email:"",
        satker_asal:"",
        no_hp:""
    })

    useEffect(()=>{
        const fetchData = async ()=>{
            await axios.get("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/transaction", {params: {email:user.email}}).then((response)=>{
               
                return setList(response.data)
            }
        ).catch((err)=>console.log(err))
    }
        fetchData()
    },[list, user.email])

    useEffect(()=>{
        const getUserInfo = async () => {
            await axios.get("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/userinfo", {params:{email:user.email}}).then((response)=>{
                return setuserInfo({nama_depan:response.data[0].nama_depan,
                nama_belakang:response.data[0].nama_belakang,
                email:response.data[0].email,
                satker_asal:response.data[0].satker_asal,
                no_hp:response.data[0].no_hp})
            }).catch((err)=>console.log(err))
        }

        getUserInfo()
    },[user.email])

    const showData = () => {
        return list.map((row, key)=>{
            return(
                <MDBListGroupItem className='d-flex justify-content-between align-items-center' key={key}>
                    <div className='d-flex align-items-center'>
                    <img alt="gambar" src={`https://bukutamu.pta-papuabarat.go.id/images/${row.photo}`} style={{filter: "brightness(1.5)", width:"100px"}} />
                    <div className='ms-3'>
                        <p className='text-muted fw-bold mb-1'>ID : {row._id.slice(-4).toUpperCase()}</p>
                        <p className='text-muted mb-0'>{row.tanggal}</p>
                        <p className='text-muted mb-0'>{row.keperluan}</p>
                        {row.status === 1 ? <MDBBadge pill light color='danger'>Unverified</MDBBadge> : <MDBBadge pill light color='success'>Verified</MDBBadge>}
                        {row.status === 1 ? <p><i>Silahkan menghubungi resepsionis untuk proses verifikasi dan mendapatkan ID Card</i></p> : false }
                    </div>
                    </div>
                    
                </MDBListGroupItem>
            )
        })
        
    }

    const showUserInfo = () => {
        return(
            <>
            <MDBCard background='primary' className='text-white mb-3'>
                <MDBCardBody>
                <MDBCardText>
                    <b>Nama :</b> {userInfo.nama_depan} {userInfo.nama_belakang}<br></br><b>Email :</b> <MDBBadge pill color='warning' light>{userInfo.email}</MDBBadge><br></br><b>Satker / Alamat :</b> {userInfo.satker_asal} <br></br><b>No. HP :</b> {userInfo.no_hp}
                </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </>
        )
    }

    return(
        <>
            <Navbar />

            <MDBContainer>
                <MDBCard alignment="left">
                    <MDBCardHeader><b>Riwayat kunjungan Anda</b></MDBCardHeader>
                    <MDBCardBody>
                        <div>
                            {showUserInfo()}
                            <MDBListGroup light>
                                {showData()}
                            </MDBListGroup>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    )
}