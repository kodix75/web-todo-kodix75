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

const addTask = () => {
  if (todoInput.value.trim() === '') {
    errorMessage.style.display = 'contents'
    return
  }
  errorMessage.style.display = 'none'
  const taskContent: string = todoInput.value.trim()
  const newTask = document.createElement('li')
  newTask.textContent = `${taskContent}`
  newTask.classList.add('todo-item', 'card-style')
  todoElements.appendChild(newTask)
}

todoForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  addTask()
  todoInput.value = ''
})
