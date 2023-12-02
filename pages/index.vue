<template>
  <div>
    <div class="flex justify-end p-4">
      <UButton
        color="red"
        @click="logout"
      >
        Logout
      </UButton>
    </div>
    <div>
      <UTable :rows="tasks" :columns="columns">
        <template #name-data="{ row }">
          <span class="text-primary-500 dark:text-primary-400">{{ row.name }}</span>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable> 
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '~~/types'
const client = useSupabaseClient()
const tasks = ref([])

init()
async function init () {
  const {data} = await useAsyncData('tasks', async () => client.from('tasks').select('*').order('id'))
  tasks.value = data.value?.data || []
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

// table
const columns = [{
  key: 'title',
  label: 'Title'
}, {
  key: 'user',
  label: 'user'
}, {
  key: 'completed',
  label: 'completed'
}, {
  key: 'actions'
}]

const items = (row: ITask) => [
  [{
    label: row.completed ? 'Uncomplete' : 'Complete',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => completeTask(row)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => removeTask(row)
  }]
]

</script>