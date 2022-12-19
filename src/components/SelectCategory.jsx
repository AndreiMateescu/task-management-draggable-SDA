import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Categories from '../shared/models/categories';
import { useDispatch } from "react-redux";
import { changeCategoryForTask } from '../store/action';

function SelectCategory ({ id, category }) {
    const dispatch = useDispatch();
    return (
        <FormControl fullWidth>
            <NativeSelect
                defaultValue={Categories.Open}
                inputProps={{
                    name: 'category',
                    id: 'category',
                }}
                value={category}
                onChange={(e) => dispatch(changeCategoryForTask({ id:id, category: e.target.value }))}
            >
            {Object.keys(Categories).map(key => <option value={key}>{key}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default SelectCategory;