const SignUpModel = require("../models/SignUpModel")

  const Verify = async (req, res) => {
    try {
      const {data} = req.body
      let name = data?.name;
      let email = data?.email;
      let family_name = data?.family_name;
      let given_name = data?.given_name;
      let picture = data?.picture;
      
      if(email==="ahyasw@gmail.com"){
          var role_id = parseInt(1)
      }else{
          var role_id = parseInt(2)
      }

      const profile = {
        "name":name, 
        "email":email, 
        "family_name":family_name, 
        "given_name":given_name, 
        "picture":picture,
        "role_id":role_id
      }

      await SignUpModel.updateOne(
          {
            email : email
          }, 
          {
            $setOnInsert: {email: email, nama_depan: given_name, nama_belakang:family_name, satker_asal:"", no_hp:"", password:"", role_id:role_id}
          },
          {upsert: true}
      )

      res.json(profile)
    } catch (error) {
      res.json(error)
    }
  }

module.exports = {Verify}