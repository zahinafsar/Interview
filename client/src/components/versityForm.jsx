import React,{ useState,useContext } from 'react';
import { Data } from '../App';
import axios from "axios";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const FormDialog=()=> {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const [universityName, setUniversityName] = useState("");
const [universities, setUniversities] = useContext(Data);

  const addUniversity = async () => {
    const { data: university } = await axios.post("/universities", {
      name: universityName
    });
    setUniversities([...universities, university]);
    setUniversityName("");
    handleClose();
  };

const classes = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  center:{
    margin:'auto'
  }
}));
  return (
    <div>
      <Button variant="outlined" className={classes.center} color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Description of University</DialogTitle>
        <DialogContent>

      <Grid container spacing={3}>
        <Grid item xs={12}>
            <TextField
            className={classes.paper}
            value={universityName}
            onChange={e => setUniversityName(e.target.value)}
            autoFocus
            label="University Name"
            type="text"
            fullWidth
          />
        </Grid>
      </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={addUniversity}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FormDialog;