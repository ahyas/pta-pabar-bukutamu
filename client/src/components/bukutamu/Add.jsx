import React, {useEffect, useState} from 'react';
import {  
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBContainer,
  MDBCard, MDBCardHeader, MDBCardBody
} from 'mdb-react-ui-kit';
import Navbar from '../Navbar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";

export default function AddBukuTamu({user}) {

  const [form, setForm] = useState({
    namaDepan:"",
    namaBelakang:"",
    email:"",
    satker_asal:"",
    noHP:"",
    keperluan:"",
    photo:""
  })

  useEffect(()=>{
    const fetchData = async () => {
      await axios.get("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/userinfo", {params:{email:user.email}}).then((response)=>{
        setForm({
          namaDepan:response.data[0].nama_depan,
          namaBelakang:response.data[0].nama_belakang,
          email:response.data[0].email,
          satker_asal:response.data[0].satker_asal,
          noHP:response.data[0].no_hp,
          keperluan:"",
          photo:""
        })
        
      }).catch((err)=>console.log("data ",err))
    }

    fetchData()

  },[user.email])

  const resetValue = (current) => {
    return setForm((prev)=>{
      return {...prev, ...current}
    })
  }

  const navigate = useNavigate()

  const date = new Date().toLocaleString()
  const currentDate = date

  const saveData = async (e) => {
    e.preventDefault()
    let today = new Date();
    let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    let time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    let datetime = date+''+time
    let filename = datetime+'.png'

    await axios.post("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/transaction/save", {
        email:form.email, 
        nama_depan:form.namaDepan, 
        nama_belakang:form.namaBelakang,
        no_hp:form.noHP, 
        keperluan:form.keperluan,
        satker_asal:form.satker_asal,
        status:"1",
        photo:filename,
        tanggal:currentDate
    }).then((response)=>{
        console.log(response.data)
        return navigate("/list")
    }).catch((err)=>console.log(err))

    const formData = { image: picture, filename:datetime }
    let endpoint = "https://bukutamu.pta-papuabarat.go.id/api/upload_image.php";
     await axios.post(endpoint, formData, {
     }).then((res) => {
        console.log('File uploaded!', res.data);
    })

  }

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
  }
  
  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    console.log("take", pictureSrc)
    setPicture(pictureSrc)
    resetValue({photo:pictureSrc})
  }, [webcamRef, setPicture])

  return (
    <>
    <Navbar/>
    <MDBContainer>
      <MDBCard alignment='left'>
        <MDBCardHeader><b>Isi buku tamu</b></MDBCardHeader>
        <MDBCardBody>
          <form onSubmit={ saveData }>
              <MDBInput 
                className='mb-4' 
                id='form3Example3' 
                label='Email' 
                value={form.email}
                onChange={(e)=>resetValue({email:e.target.value})}
                readOnly={true}
              /> 
              <MDBRow className='mb-4'>
                  <MDBCol>
                    <MDBInput 
                      id='form3Example1' 
                      label='Nama depan' 
                      value={form.namaDepan}
                      onChange={(e)=>resetValue({namaDepan:e.target.value})} 
                      autoFocus
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput 
                      id='form3Example2' 
                      label='Nama belakang' 
                      value={form.namaBelakang}
                      onChange={(e)=>resetValue({namaBelakang:e.target.value})}
                    />
                  </MDBCol>
              </MDBRow>
              <MDBInput 
                className='mb-4' 
                id='form3Example4' 
                label='No. HP'
                value={form.noHP}
                onChange={(e)=>resetValue({noHP:e.target.value})}
              />

              <MDBInput 
                className='mb-4' 
                id='form3Example4' 
                label='Satker asal / alamat'
                value={form.satker_asal}
                onChange={(e)=>resetValue({satker_asal:e.target.value})}
              />

              <MDBInput 
                className='mb-4' 
                id='form3Example5' 
                label='Keperluan'
                value={form.keperluan}
                onChange={(e)=>resetValue({keperluan:e.target.value})}
              />
              <MDBRow className='mb-4'>
                <MDBCol>
                  <div>
                  <p className="text-muted">Ambil photo selfie</p>
                    {picture === '' ? (
                      <Webcam
                        mirrored={true}
                        audio={false}
                        ref={webcamRef}
                        width={"100%"}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                      />
                    ) : (
                      <img alt='' src={picture} />
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
              
              <div>
                {picture !== '' ? (
                  <MDBBtn
                    onClick={(e) => {
                      e.preventDefault()
                      setPicture('')
                    }}
                    className='mb-4' 
                    color='danger'
                    style={{"marginBottom":"10px"}}
                    block
                  >
                    Ulangi ambil gambar
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    onClick={(e) => {
                      e.preventDefault()
                      capture()
                    }}
                    className='mb-4' 
                    color='success'
                    style={{"marginBottom":"10px"}}
                    block
                  >
                    Ambil gambar
                  </MDBBtn>
                )}
              </div>
              <MDBBtn type='submit' className='mb-4' block>
                  Simpan
              </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>          
    </MDBContainer>
    </>
  );
}