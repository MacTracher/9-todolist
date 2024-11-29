import React, {memo} from 'react';
import Button from "@mui/material/Button";
import {FilterValuesType} from "./App";


type FilterButtonsType = {
    filter: FilterValuesType
    changeFilterTasksHandler: (filter: FilterValuesType)=>void
}

export const FilterButtons = memo((props:FilterButtonsType) => {
    return (
        <div>
            <Button
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => props.changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => props.changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => props.changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </div>
    );
})
