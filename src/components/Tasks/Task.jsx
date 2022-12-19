import React from "react";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SelectCategory from "../SelectCategory";

const formatDate = (date) => {
  const localDate = date.toLocaleDateString('en-GB').split('/').reverse().join('.');
  const splits = date.toLocaleTimeString('en-GB').split(':');
  const fullDate = `${localDate} - ${splits[0]}:${splits[1]}:${splits[2]}`;
  return fullDate;
}
const Task = ({ task })=> {

    return (
      <Box sx={{ border: '1px solid blue', borderRadius: "16px", marginTop: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {task.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.description}
          </Typography>
          <Typography variant="body2">
          {task.person}
          </Typography>
          <Typography variant="body2">
          Initial: {formatDate(task.date)}
          </Typography>
          <Typography variant="body2">
          Last Modified: {formatDate(task.lastModificationDate)}
          </Typography>
          <Typography variant="body2">
            <SelectCategory id={task.id} category={task.category} />
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Box>
    )
  }

export default Task;