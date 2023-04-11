import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";


export default function Home({user}){

        let navigate = useNavigate()

        const handleClick = async () => {
            await axios.post("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/survey/api/v1/insert",{
            id_user:user.email,
            }).then((response)=>{
                console.log(response.data)
                return navigate("/survey/add", {state:{id_user:user.email}})
            }).catch((error)=>console.log(error))

        }

    const display = () =>{
        if(user.role_id === 2){
            return(
                <>
                    <img src={user.picture} alt="" className='rounded-circle' style={{marginBottom:"15px"}}/>
                  <MDBCardTitle>Selamat datang, {user.name}</MDBCardTitle>
                  <MDBCardText>Silahkan isi buku tamu terlebih dahulu</MDBCardText>
                  <Link to={'/add'}><MDBBtn>Isi Buku Tamu</MDBBtn></Link>
                  <MDBBtn onClick={()=>handleClick()} color='success' style={{marginLeft:"10px"}}>Isi Survey</MDBBtn>
                 
                </>
              )
        }else{
            return(
                <>
                <img src={user.picture} alt="" className='rounded-circle' style={{marginBottom:"15px"}} />
                  <MDBCardTitle>Selamat datang, Admin</MDBCardTitle>
                  <MDBCardText>Silahkan isi buku tamu terlebih dahulu</MDBCardText>
                  <Link to={'/Verifikasi'}><MDBBtn>Verifikasi</MDBBtn></Link>
                 
                </>
              )
        }
      }

    return(
        <>
        <Navbar role_id={user.id}/>
            <MDBContainer> 
                <MDBCard>
                    <MDBCardHeader>Home</MDBCardHeader>
                    <MDBCardBody>
                        {display()}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    )
}