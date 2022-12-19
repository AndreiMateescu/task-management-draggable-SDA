import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SelectCategory from "../SelectCategory";
import Categories from "../../shared/models/categories";
import { arrayEquals } from "../../utils/arrays";
import { changeCategoryForTask } from "../../store/action";
import { connect } from 'react-redux';

const ReactGridLayout = WidthProvider(RGL);

const formatDate = (date) => {
  const localDate = date.toLocaleDateString('en-GB').split('/').reverse().join('.');
  const splits = date.toLocaleTimeString('en-GB').split(':');
  const fullDate = `${localDate} - ${splits[0]}:${splits[1]}:${splits[2]}`;
  return fullDate;
}

class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 8
  };

  constructor(props) {
    //console.log(props);
    super(props);

    const layout = this.generateLayout(this.props.tasks);
    this.state = { 
      layout: layout,
      tasks: this.props.tasks
    };
  }

  componentDidMount() {
    console.log('Render BasicLayout');
  }

  componentDidUpdate() {
    const layout = this.generateLayout(this.props.tasks);
    if (!arrayEquals(this.state.layout, layout)) {
      this.setState({
        layout: layout,
      });
    }
    console.log('Re-Render BasicLayout');
  }

  generateDOM() {
    return _.map(_.range(this.state.tasks.length), (i) => {
      return (
        <div key={i}>
          <Box sx={{ border: '1px solid blue', borderRadius: "16px", marginTop: 2, cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {this.state.tasks[i].name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {this.state.tasks[i].description}
              </Typography>
              <Typography variant="body2">
              {this.state.tasks[i].person}
              </Typography>
              <Typography variant="body2">
              Initial: {formatDate(this.state.tasks[i].date)}
              </Typography>
              <Typography variant="body2">
              Last Modified: {formatDate(this.state.tasks[i].lastModificationDate)}
              </Typography>
              <Typography variant="body2">
                <SelectCategory id={this.state.tasks[i].id} category={this.state.tasks[i].category} />
              </Typography>
            </CardContent>
          </Box>
        </div>
      );
    });
  }

  generateLayout(tasks) {
    console.log('Layout');
    return _.map(new Array(tasks.length), (item, i) => {
      let x = 0; //open
      if (tasks[i].category === Categories.Open) {
        x = 0
      } else if (tasks[i].category === Categories.InProgress) {
        x = 2;
      } else if (tasks[i].category === Categories.Testing) {
        x = 4;
      } else if (tasks[i].category === Categories.Done) {
        x = 6;
      }
      return {
        x: x,
        y: 0,
        w: 2,
        h: 5,
        i: i.toString()
      };
    });
  }

  dragStop(layout, oldItem, newItem, placeHolder, event) {
    console.log(oldItem);
    console.log(newItem);
    const id = this.state.tasks[newItem.i].id;
    let status = Categories.Open;
    if (newItem.x === 0) {
      status = Categories.Open;
    } else if (newItem.x === 2) {
      status = Categories.InProgress;
    } else if (newItem.x === 4) {
      status = Categories.Testing;
    } else if (newItem.x === 6) {
      status = Categories.Done;
    }

    this.props.changeCategoryForTask(id, status);
  }

  onLayoutChange(layout) {
    console.log(layout);
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        onDrag={() => console.log('Drag')}
        onDragStop={(layout, oldItem, newItem, placeHolder, event) => this.dragStop(layout, oldItem, newItem, placeHolder, event)}
        {...this.props}
        onDrop={(layout, item, e) => {
          console.log(layout);
          console.log(item);
          console.log(e);
        }}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeCategoryForTask: (id, category) => dispatch(changeCategoryForTask({id, category}))
 });

 const mapStateToProps = (store) => {
  return {
      tasks: store.tasks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);