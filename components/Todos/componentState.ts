import { signal, effect } from '@preact/signals-react';
import { TodoType } from "./Todos";

export const triggerTodoForm = signal(false);
export const selectedTodo = signal<TodoType | null>(null);