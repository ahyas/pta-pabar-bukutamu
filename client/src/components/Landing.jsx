import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

export default function Landing({login}){    
  return (
    <>
    <MDBContainer>
      <MDBCard alignment='center'>
          <MDBCardHeader>Selamat Datang di PTA Papua Barat</MDBCardHeader>
          <MDBCardBody>
            <img alt="logo" style={{width:"120px"}} src="/logo.png" />
            <h4>Silahkan login untuk mengisi buku tamu</h4>
            <MDBBtn className='mb-4' onClick={() => login()} block color="danger"><MDBIcon fab icon='google' size='lg' /> Login dengan Google</MDBBtn>
          </MDBCardBody>
      </MDBCard>
      </MDBContainer>
    </>
  );
}