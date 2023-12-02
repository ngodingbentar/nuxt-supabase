<template>
  <div class="p-4">
    <div class="flex justify-end">
      <UButton
        color="red"
        @click="logout"
      >
        Logout
      </UButton>
    </div>
    <AddTask @add-task="addTask" :loading="loading" />
    <TableTasks v-if="tasks.length > 0" :tasks="tasks" @complete-task="completeTask" @remove-task="removeTask" />
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '~~/types'
const client = useSupabaseClient()
const user = useSupabaseUser()
const tasks = ref([] as ITask[])
const loading = ref(false)

init()
async function init () {
  const {data} = await useAsyncData('tasks', async () => client.from('tasks').select('*').order('id'))
  tasks.value = data.value?.data || []
}

async function addTask (payload: string) {
  loading.value = true

  const { data } = await client.from('tasks')
    .upsert({
      user: user.value.id,
      title: payload,
      completed: false
    })
    .select('id, title, completed')
    .single()

  tasks.value.push(data as ITask)
  loading.value = false
}

const completeTask = async (task: ITask) => {
  await client.from('tasks').update({ completed: !task.completed }).match({ id: task.id })
  init()
}

const removeTask = async (task: ITask) => {
  tasks.value = tasks.value.filter((t: ITask) => t.id !== task.id)
  await client.from('tasks').delete().match({ id: task.id })
  init()
}

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

</script>