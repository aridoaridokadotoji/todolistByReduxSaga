const getFilteredForDeleteTaskList = (state, id) => {
  console.log('Id in filter..', id)
  const newTasks = state.taskEntry.tasks.filter(item => {
    return item.id !== id
  })
  console.log('Delete Filter..', newTasks)
  return newTasks
}
export default getFilteredForDeleteTaskList
