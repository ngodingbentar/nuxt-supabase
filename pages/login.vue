<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <div>
      <h2>
        Sign in to your account
      </h2>
    </div>
    <div class="w-1/3 mt-8">
      <UForm :validate="validate" :state="state" class="space-y-4" @submit="signInWithEmail">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" placeholder="admin@mailinator.com" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="Akuntes01" />
        </UFormGroup>

        <!-- <UButton type="submit" @click="signUpNewUser">
          Register
        </UButton> -->
        <div class="h-4 w-full">
          <p v-if="isError" class="text-red-500">{{ isError }}</p>
        </div>
        <UButton type="submit" @click="signInWithEmail">
          Signin
        </UButton>
      </UForm>
    </div>
    <div>
      <UButton
        class="mt-4"
        color="blue"
        @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
      >
        Sign in with Github
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent, FormErrorEvent,  } from '#ui/types'
const client = useSupabaseClient()
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})

// form login
const isError = ref('')
const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

// async function signUpNewUser() {
//   const { data, error } = await client.auth.signUp({
//     email: state.email || '',
//     password: state.password || ''
//   })
// }

async function signInWithEmail() {
  const { data, error } = await client.auth.signInWithPassword({
    email: state.email || '',
    password: state.password || ''
  })
  isError.value = error?.message || 'Something went wrong'
}
</script>