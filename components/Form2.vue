<script lang="ts" setup>

const props = defineProps<{ 
  action: 'login'|'register',
  title: string;
  variant?: "primary" | "borderless";

}>()

const router = useRouter();
const showPassword = ref(false);

const username = ref('');
const password = ref('')
const error = ref('')



async function onSubmit (event: Event) {
    event.preventDefault()
 try{

    const route = props.action === 'register' ? 'auth/register' : 'auth/login'
 
    // Envoyer une requete POST à l'API sur la route /auth/register avec le username et le password
    const response = await fetch(`http://localhost:4000/${route}`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })

    if (!response.ok) throw new Error('Une erreur est survenue sur le serveur')

    const data = await response.json()

    const cookieJwt = useCookie('api_tracking_jwt')
    cookieJwt.value = data.token

    await router.push('/app/dashboard')

    } catch {
        error.value = 'Mon message d\'erreur'
    }

}



</script>

<template>

<form
    :class="{
      form: true,
      '-borderless': variant === 'borderless',
    }" @submit="onSubmit">
        

    <div class="form">
      <p class="form__title">{{ title }}</p>
      <div class="form__mail">
        <label for="username">Username</label>
        <input v-model="username" type="username" name="username" >
      </div>
      <div class="form__password">
        <label for="password">Password</label>
        <div class="form__password__input">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
          >
          <div
            type="button"
            class="form__password__toggle"
            @click="showPassword = !showPassword"
          >
            <Eye v-if="!showPassword" />
            <EyeClose v-else />
          </div>
        </div>
      </div>

      <div class="form__submit">
        <Button type="submit" class="button -outline">{{ title }}</Button>
      </div>
    </div>
  </form>

</template>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px #ccc;
  background: $gray100;

  &__mail,
  &__password {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 12px;
      color: $black;
    }
    input {
      padding: 10px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;
      width: 90%;
      border-radius: 20px;
    }
  }
  &__submit {
    text-align: center;
  }
  &__password__input {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
  }
  &__title {
    font-size: 20px;
    text-align: center;
    color: $black;
  }
  &__password__toggle {
    font-size: 12px;
    font-weight: 600;
    // cursor: pointer;
    border: none;
    background: none;
    position: absolute;
    right: 3%;
  }

  //BORDERLESS

  &.-borderless {
    border: none;
    box-shadow: none;
    background: none;
    // backdrop-filter: blur(10px);
    // box-shadow: 0 0 10px #ccc;

    .form {
      border: none;
      box-shadow: none;
      background: none;

      &__title {
        color: $white;
      }
      &__mail,
      &__password {
        input {
          border: none;
          box-shadow: none;
          border-radius: 20px;
        }
        label {
          color: $white;
        }
      }
    }
  }
}
</style>