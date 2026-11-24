// -- Types --
interface Todo {
  id: string
  text: string
  done: boolean
}
// --- DOM ---
const checkNull = <T extends HTMLElement>(id: string): T => {
  const elementCheck = document.querySelector<T>(id)
  if (!elementCheck) {
    throw new Error(`${id} value is null`)
  }
  return elementCheck
}

const checkedElement = {
  todoInput: checkNull<HTMLInputElement>('#todo-input'),
  todoElements: checkNull<HTMLUListElement>('#todo-elements'),
  errorMessage: checkNull<HTMLSpanElement>('#error-message'),
  todoForm: checkNull<HTMLFormElement>('#todo-form'),
}
const { todoInput, errorMessage, todoElements, todoForm } = checkedElement

// --- Storage keys ---
const TODOS_KEY = 'todos'
// --- Save ---
function saveTodos(todos: Todo[]): void {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}
// ---- Load ----
function isTodo(x: unknown): x is Todo {
  return (
    typeof x === 'object' &&
    x !== null &&
    typeof (x as Todo).id === 'string' &&
    typeof (x as Todo).text === 'string' &&
    typeof (x as Todo).done === 'boolean'
  )
}

function loadTodos(): Todo[] {
  const rawTodo = localStorage.getItem(TODOS_KEY)
  if (rawTodo === null) return []

  try {
    const parsed: unknown = JSON.parse(rawTodo)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isTodo)
  } catch {
    return []
  }
}
// --- State ---
const todos: Todo[] = loadTodos()
// --- Render ---
function renderTodo(todo: Todo): void {
  const li = document.createElement('li')
  li.textContent = todo.text
  li.dataset.id = todo.id
  li.classList.add('todo-item', 'card-style')
  if (todo.done) li.classList.add('done')
  todoElements.appendChild(li)
}
function renderAll(): void {
  todoElements.innerHTML = ''
  todos.forEach(renderTodo)
}
// --- Add ---
function addTask(): void {
  const text = todoInput.value.trim()
  if (text === '') {
    errorMessage.style.display = 'contents'
    return
  }
  errorMessage.style.display = 'none'

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text,
    done: false,
  }
  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos(todos)
}
// --- Events ---
todoForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  addTask()
  todoInput.value = ''
})

// --- Render All ---
renderAll()
