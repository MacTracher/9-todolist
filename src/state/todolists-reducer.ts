import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType):TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.id)
		}

		case 'ADD-TODOLIST': {
			const newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
			return [...state, newTodolist]
		}

		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
		}

		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
		}

		default:
			return state
	}
}

// Action creators
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return {type: 'ADD-TODOLIST', payload: {title,todolistId: v1()}} as const
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
	return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const
}

// Actions types
export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST';
	payload: {
		id: string;
	}
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST';
	payload: {
		title: string;
		todolistId: string;
	}
};

export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE';
	payload: {
		id: string;
		title: string;
	}
};

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER';
	payload: {
		id: string;
		filter: FilterValuesType;
	}
};

export type ActionsType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

