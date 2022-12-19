import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { connect } from "react-redux";
import Task from "./Task";
import Typography from '@mui/material/Typography';
import Categories from "../../shared/models/categories";
import GridLayout from "react-grid-layout";
import BasicLayout from "../BasicLayout/BasicLayout";

function Tasks(props) {
    console.log('Tasks render');
    return (
        <BasicLayout />
  )
}


const mapStateToProps = (store) => {
    return {
        tasks: store.tasks
    }
}

export default connect(mapStateToProps)(Tasks);