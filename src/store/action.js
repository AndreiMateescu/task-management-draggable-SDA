export const READ_TAKS = "READ_TAKS";
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";

export const getTasks = () => {
  return {
    type: READ_TAKS,
    value: null,
  };
};

//data => id, category
export const changeCategoryForTask = (data) => {
  console.log(data);
  return {
    type: CHANGE_CATEGORY,
    value: data,
  };
};
