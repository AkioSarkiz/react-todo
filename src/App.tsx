import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button, Card,
    Container,
    Stack,
    CardActions,
    TextField,
    Typography, CardContent, IconButton, Alert
} from "@mui/material";

function App() {
    interface TodoItem {
        id: number,
        title: string,
        description: string,
    }

    const [isValidationFail, setValidationFail] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [todos, setTodos] = useState<TodoItem[]>([
        {id: 1, title: 'Create react app', description: 'Man just create simple todo app!'},
        {id: 2, title: 'Drink coffee', description: 'As rule you can drink coffee after good job.'},
    ]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
    }

    const handleCreate = () => {
        if (title.length === 0) {
            // title is required.
            setValidationFail(true);
            return;
        } else {
            setValidationFail(false);
        }

        setTodos([
            ...todos,
            {
                id: Date.now(),
                title,
                description,
            },
        ] as TodoItem[]);
        resetForm();
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo: TodoItem) => todo.id !== id)
        );
    }

    return (
        <Container>
            <Typography variant="h3" gutterBottom>Todolist</Typography>

            {
                isValidationFail &&
                <Alert severity="error">Write the title.</Alert>
            }

            <form>
                <Stack spacing={2} direction={"column"}>
                    <TextField label="Title" value={title} onChange={(e: any) => setTitle(e.target.value)}/>
                    <TextField label="Description" value={description}
                               onChange={(e: any) => setDescription(e.target.value)}/>
                    <Button onClick={handleCreate} color="primary">Create</Button>
                </Stack>
            </form>

            <Stack spacing={2}>
                {todos.map((todo: TodoItem) =>
                    <Card key={todo.id} onClick={() => 1}>
                        <CardContent>
                            <Typography variant="h6">
                                {todo.title}
                            </Typography>
                            <Typography variant="subtitle1">
                                {todo.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleDelete(todo.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                )}
            </Stack>

        </Container>
    );
}

export default App;
