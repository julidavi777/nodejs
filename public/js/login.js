import {axios} from 'axios'
import '@babel/polyfill'
export const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    console.log(res.data)
    if(res.data.status == 'success'){
      alert('logged in succesfully!'); 
      window.setTimeout(()=>{
        location.assign('/'); 
      }, 1500)
    }      
  } catch (err) {
      console.log(err.response.data.message);
  }
};

