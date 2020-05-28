import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import App from "../App"

export default function User() {

const [email, setemail] = useState("");
const [password, setpass] = useState("");
const [loged, setloged] = useState(false);
const [load, setload] = useState(false);



  const signup = async () => {
    setload(true)
    const res = await axios.post("/logup", {
      email,
      password
    })
    console.log(res);
    if (res.data === 200) { setloged(true) ; setload(false)}
    if (res.data === 404) { alert("Error ocured") }
  } 

  const signin = async () => {
    setload(true)
    const res = await axios.post("/signin", {
      email,
      password
    })
    console.log(res);
    if (res.data === 200) { setloged(true) ; setload(false) }
    if (res.data === 404) { alert("account not found") }
  }

  return (
    <div>
  { loged ? <App/> : 
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    >
    <form container noValidate autoComplete="off">
      <TextField id="outlined-basic" value={email} label="Email" variant="outlined" onChange={e => setemail(e.target.value)}/><br/><br/>
      <TextField id="outlined-basic" value={password} label="Password" variant="outlined" onChange={e => setpass(e.target.value)}/><br/><br/>
      <Button variant="outlined" color="primary" onClick={signup}>
        Signup
      </Button><span> or </span>
      <Button variant="outlined" color="warning" onClick={signin}>
        Signin
      </Button>
    </form>
    </Grid>}
    {load ? <h5 align='center'>loading.........</h5> : ""}
    </div>
  );
}
