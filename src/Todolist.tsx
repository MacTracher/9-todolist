import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, memo, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {FilterButtons} from "./FilterButtons";


type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = memo((props: PropsType) => {

	const {
		title,

		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		updateTask,
		updateTodolist
	} = props

	const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	},[props.todolistId])

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskCallback = useCallback((title: string) => {
		addTask(title, props.todolistId)
	},[addTask,props.todolistId])

	const updateTodolistHandler = (title: string) => {
		updateTodolist(props.todolistId, title)
	}

	let tasks = props.tasks

	if (props.filter === 'active') {
		tasks = tasks.filter(task => !task.isDone)
	}

	if (props.filter === 'completed') {
		tasks = tasks.filter(task => task.isDone)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							const changeTaskTitleHandler = (title: string) => {
								updateTask(todolistId, task.id, title)
							}
							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
								</div>
								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<FilterButtons filter={filter} changeFilterTasksHandler={changeFilterTasksHandler}/>
			</Box>
		</div>
	)
})
