const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const SignUpModel = require("../models/SignUpModel")
let DB = [];

/**
 *  This function is used verify a google account
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
      return { error: "Invalid user detected. Please try again" };
  }
}

const SignUp = async (req, res) => {
    try {
        //console.log({ verified: verifyGoogleToken(req.body.credential) });
        if (req.body.credential) {
          const verificationResponse = await verifyGoogleToken(req.body.credential);
          if (verificationResponse.error) {
            return res.status(400).json({
              message: verificationResponse.error,
            });
          }
    
          const profile = verificationResponse?.payload;
          
        
        if(profile.email==="ahyasw@gmail.com"){
            var role_id = parseInt(1)
        }else{
            var role_id = parseInt(2)
        }
        //if user not exist create otherwise update
        await SignUpModel.updateOne(
            {
              email : profile.email
            }, 
            {
              $setOnInsert: {email: profile.email, nama_depan: profile.given_name, nama_belakang:profile.family_name, satker_asal:"", no_hp:"", password:"", role_id:role_id}
            },
            {upsert: true}
        )
          
          DB.push(profile);
    
          res.status(201).json({
            message: "Signup was successful",
              user: {
                firstName: profile?.given_name,
                lastName: profile?.family_name,
                picture: profile?.picture,
                email: profile?.email,
                token: jwt.sign({ email: profile?.email }, "myScret", {
                  expiresIn: "1d",
                }),
                role_id: role_id
              },
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "An error occured. Registration failed.",
        });
      }
}

const userInfo = async (req, res) => {
  try {
    let email = req.query.email
    let data = await SignUpModel.find({email:email})
    console.log(data)
    res.json(data)
  } catch (error) {
    res.json(error)
  }
}

module.exports = {SignUp, userInfo}