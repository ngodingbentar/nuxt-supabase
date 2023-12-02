<template>
  <div>
    <UTable :rows="tasks" :columns="columns">
      <template #name-data="{ row }">
        <span class="hah text-primary-500 dark:text-primary-400">{{ row.name }} hah</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable> 
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '~~/types'

const props = defineProps({
  tasks: {
    type: Array as PropType<ITask[]>,
  }
})

const emit = defineEmits(['complete-task', 'remove-task'])

// table
const columns = [{
  key: 'title',
  label: 'Title'
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
    click: () => emit('complete-task', row)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => emit('remove-task', row)
  }]
]
</script>