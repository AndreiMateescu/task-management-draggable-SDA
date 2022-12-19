import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { connect } from "react-redux";
import Task from "./Task";
import Typography from '@mui/material/Typography';
import Categories from "../../shared/models/categories";
import GridLayout from "react-grid-layout";

function Tasks(props) {
    return (
    <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={3}>
            <Typography variant="h4" align="center" color="text.secondary" gutterBottom>
                Open
            </Typography>
            <Box sx={{ border: 0 }} className="open">{props.tasks.filter(task=> task.category === Categories.Open).map((task) => <Task key={task.id} task={task}/>)}</Box>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h4" align="center" color="text.secondary" gutterBottom>
                In Progress
            </Typography>
            <Box sx={{ border: 0 }} className="in-progress">{props.tasks.filter(task=>task.category === Categories.InProgress).map((task) => <Task key={task.id} task={task}/>)}</Box>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h4" align="center" color="text.secondary" gutterBottom>
                Testing
            </Typography>
            <Box sx={{ border: 0 }} className="testing">{props.tasks.filter(task=>task.category === Categories.Testing).map((task) => <Task key={task.id} task={task}/>)}</Box>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h4" align="center" color="text.secondary" gutterBottom>
                Done
            </Typography>
            <Box sx={{ border: 0 }} className="done">{props.tasks.filter(task=>task.category === Categories.Done).map((task) => <Task key={task.id} task={task}/>)}</Box>
        </Grid>
  </Grid>
  )
}


const mapStateToProps = (store) => {
    return {
        tasks: store.tasks
    }
}

export default connect(mapStateToProps)(Tasks);