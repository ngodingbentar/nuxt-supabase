<template>
  <div class="mt-8">
    <form
      class="flex gap-2 my-2"
      @submit.prevent="addTask"
    >
      <UInput
        v-model="newTask"
        :loading="loading"
        class="w-full"
        size="xl"
        type="text"
        name="newTask"
        placeholder="Input a new task"
        autofocus
        autocomplete="off"
      />
      <UButton
        type="submit"
      >
        Add
      </UButton>
    </form>
  </div>
</template>

<script setup lang="ts">
const newTask = ref('')
const loading = ref(false)

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

watch(() => props.loading, (value) => {
  if(!value)
    newTask.value = ''
})

const emit = defineEmits(['add-task'])
function addTask () {
  if (newTask.value.trim().length === 0) return
  emit('add-task', newTask.value)
}
</script>