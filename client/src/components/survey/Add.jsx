import React from 'react';
import {  
    MDBContainer,
    MDBCard, MDBCardHeader, MDBCardBody, MDBBtn, MDBCardFooter, MDBRadio, MDBBtnGroup
  } from 'mdb-react-ui-kit';
import Navbar from '../Navbar';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

// my profiles.json
let profiles = [
  {
    "id":1,
    "id_category":1,
    "name":"Informasi Pelayanan pada unit layanan ini tersedia melalui media elektronik maupun non elektronik",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  }, 
  {
    "id":2,
    "id_category":1,
    "name":"Persyaratan pelayanan yang diinformasikan sesuai dengan persyaratan yang ditetapkan unit layanan ini", 
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  }, 
  {
    "id":3,
    "id_category":1,
    "name":"Prosedur/Alur pelayanan yang ditetapkan unit layanan ini mudah diikuti/dilakukan", 
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":4,
    "id_category":1,
    "name":"Jangka waktu penyelesaian pelayanan yang diterima Bapak/lbu sesuai dengan yang ditetapkan unit layanan ini", 
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":5,
    "id_category":1,
    "name":"Tarif/Biaya pelayanan yang dibayarkan pada unit layanan ini sesuai dengan tarif/biaya yang ditetapkan", 
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":6,
    "id_category":1,
    "name":"Sarana prasarana pendukung pelayanan/sistem pelayanan online yang disediakan unit layanan ini memberikan kenyamanan/mudah digunakan",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":7,
    "id_category":1,
    "name":"Petugas pelayanan/sistem pelayanan online pada unit layanan ini merespon keperluan Bapak/lbu dengan cepat",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":8,
    "id_category":1,
    "name":"Layanan konsultasi dan pengaduan yang disediakan unit layanan ini mudah digunakan/diakses",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":9,
    "id_category":2,
    "name":"Tidak ada diskriminasi pelayanan pada unit layanan ini",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":10,
    "id_category":2,
    "name":"Tidak ada pelayanan diluar prosedur/kecurangan pelayanan pada unit layanan ini",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":11,
    "id_category":2,
    "name":"Tidak ada penerimaan imbalan uang/barang/fasilitas diluar ketentuan yang berlaku pada unit layanan ini",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":12,
    "id_category":2,
    "name":"Tidak ada pungutan liar (pungli) pada unit layanan ini",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
  {
    "id":13,
    "id_category":2,
    "name":"Tidak ada percaloan/perantara tidak resmi pada unit layanan ini",
    "choices":[
      {"opsi":"1", "value":1},
      {"opsi":"2", "value":2},
      {"opsi":"3", "value":3},
      {"opsi":"4", "value":4},
      {"opsi":"5", "value":5},
      {"opsi":"6", "value":6}
    ]
  },
]

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      displayNext: "inline-block",
      disabledPrev: false,
      displayFinish: "none",
    }
  }


    togglePrev(e) {
      let index = this.state.index - 1;
      let disabledPrev = (index === 0);
      
      this.setState({ index: index, disabledPrev: disabledPrev, displayNext:"inline-block", displayFinish:"none" })
    }

    toggleNext = async (e) => {
      try {
        let index = this.state.index + 1;
        let displayNext = index === (this.props.profiles.length - 1);
        //get selected option
        let email=document.querySelector('#id_user').value
        console.log(email)
        let value = document.querySelector('input[name="inlineRadio"]:checked').value
        await axios.patch("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/survey/api/v1/update", {id_user:email, id_question:index, value:value, }).then((response)=>{
          console.log(response)
          return true
        }).catch((err)=>console.log(err))
        //clear selection
        document.querySelector('input[name="inlineRadio"]:checked').checked = false;
        
        let displayFinish = displayNext === true ? "inline-block" : "none"
        let showNext = displayNext === true ? "none" : "inline-block"
        this.setState({ index: index, displayNext: showNext, disabledPrev: false, displayFinish:displayFinish}) 
      } catch (error) {
        window.confirm("Pilih jawaban Anda!")
      }
    }

    toggleFinish = async (e) => {
      console.log("Finish")
        let a = document.querySelector('input[name="inlineRadio"]:checked').value;
        let index = this.state.index + 1;
        let email=document.querySelector('#id_user').value
        await axios.patch("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/survey/api/v1/update", {id_user:email, id_question:index, value:a }).then((response)=>{
          console.log(response)
        return true
      }).catch((err)=>console.log(err))
    }

   render() {
     const { index, displayNext, disabledPrev, displayFinish } = this.state
     const profile = this.props.profiles ? this.props.profiles[index] : null

     if (profile) {
       return (
         <div className='profile'>
            <MDBCardBody>
                <Profile {...profile} />
            </MDBCardBody>
            <MDBCardFooter className='text-muted'>
                <Prev toggle={(e) => this.togglePrev(e)} active={disabledPrev} />
                <Next toggle={(e) => this.toggleNext(e)} displayed={displayNext} />
                <Finish toggle={(e)=>this.toggleFinish(e)} displayed={displayFinish} />
            </MDBCardFooter>
         </div>
       )
     } else {
        return <span>error</span>
     }
  }
}

function Prev(props) {
  return (
    <MDBBtn onClick={props.toggle} disabled={props.active}>Previous</MDBBtn>
  );
}

function Next(props) {
  return (
    <MDBBtn onClick={props.toggle} disabled={props.active} style={{marginLeft:"10px", display:props.displayed}}> Next</MDBBtn>
  );
}

function Finish(props) {
  return (
    <NavLink to={"/home"}>
      <MDBBtn onClick={props.toggle} style={{marginLeft:"10px", display:props.displayed}}> Finish</MDBBtn>
    </NavLink>
  );
}

function handleOnCHange(e){
  console.log(e.target.value)
}

function Profile(props) {
  const {state} = useLocation()
  const {id_user} = state
  return (
    <div>
        <h3>{props.id} {props.name}</h3>
        <input type={"hidden"} value={id_user} id="id_user" readOnly/>
        <p>Penilaian Anda</p>
          <MDBBtnGroup>
            <MDBRadio btn btnColor='secondary' id='btn-radio' name='inlineRadio' wrapperTag='span' value={props.choices[0].value} label={props.choices[0].opsi} onChange={(e)=>handleOnCHange(e)} />
            <MDBRadio btn btnColor='secondary' id='btn-radio2' name='inlineRadio' wrapperTag='span' value={props.choices[1].value} label={props.choices[1].opsi} onChange={(e)=>handleOnCHange(e)} />
            <MDBRadio btn btnColor='secondary' id='btn-radio3' name='inlineRadio' wrapperTag='span' value={props.choices[2].value} label={props.choices[2].opsi} onChange={(e)=>handleOnCHange(e)} />
            <MDBRadio btn btnColor='secondary' id='btn-radio4' name='inlineRadio' wrapperTag='span' value={props.choices[3].value} label={props.choices[3].opsi} onChange={(e)=>handleOnCHange(e)} />
            <MDBRadio btn btnColor='secondary' id='btn-radio5' name='inlineRadio' wrapperTag='span' value={props.choices[4].value} label={props.choices[4].opsi} onChange={(e)=>handleOnCHange(e)} />
            <MDBRadio btn btnColor='secondary' id='btn-radio6' name='inlineRadio' wrapperTag='span' value={props.choices[5].value} label={props.choices[5].opsi} onChange={(e)=>handleOnCHange(e)} />
          </MDBBtnGroup>
    </div>
  );
}

export default function AddSurvey({user}){

    return(
        <>
            <Navbar/>
            <MDBContainer>
            <MDBCard alignment='center'>
                <MDBCardHeader><b>Isi Survey</b></MDBCardHeader>
                    <Main profiles={profiles} />
            </MDBCard>
            </MDBContainer>
        </>
    )
}