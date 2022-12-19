import tasks from "../shared/data/tasks";
import Categories from "../shared/models/categories";
import { READ_TAKS, CHANGE_CATEGORY } from "./action";

const INITIAL_STATE = {
  tasks: tasks,
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case READ_TAKS:
      return state;
    case CHANGE_CATEGORY:
      let initialTasks = [...tasks];
      const foundTask = initialTasks.find(
        (task) => task.id === action.value.id
      );
      const foundIndexTask = initialTasks.findIndex(
        (task) => task.id === action.value.id
      );
      foundTask.category = Categories[action.value.category];
      initialTasks[foundIndexTask] = foundTask;
      return {
        ...state,
        tasks: initialTasks,
      };
    default:
      return state;
  }
};

export default reducer;
