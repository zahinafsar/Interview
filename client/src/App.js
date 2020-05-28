import React, { useState,useEffect,createContext } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Avatar,
  makeStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Bar from "./components/Bar";
import FormDialog from "./components/versityForm"
import axios from "axios";
export const Data = createContext();

function App() {
  const [universities, setUniversities] = useState([]);

const deleteUniversity = async uid => {
    let newUniversity = universities.filter(u => u.id !== uid);
    setUniversities(newUniversity);
    await axios.delete("/universities/" + uid);
};

  const classes = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(10, 0, 6),
  }
  }));

  useEffect(()=>{
    const getUniversities = async () => {
    const versities = await axios.get("/universities");
    setUniversities(versities.data);
   }
    getUniversities();
  },[universities])

  return (
    <Data.Provider value={[universities, setUniversities]}>
    <>
      <Bar />
      <br/>
     <FormDialog 
            style={{ marginTop: 12,marginBottom: 12 }}
            size="large"
            variant="contained"
            color="primary"
            />
        <hr/>

            <Grid item xs={12} md={6}>

          {universities.map(u => (
          <div className={classes.demo} key={u.id}>
            <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={u.name}
                  />
                  <ListItemSecondaryAction onClick={() => deleteUniversity(u._id)}>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
          </div>
          ))}
        </Grid>
    </>
    </Data.Provider>
  );
}

export default App;
