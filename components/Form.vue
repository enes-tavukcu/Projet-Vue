<script setup lang="ts">
const email = ref("");
const password = ref("");

function handleSubmit() {
  alert(email.value);
  api.post("/login", { email: email.value, password: password.value });
}

defineProps<{
  title: string;
  variant?: "primary" | "borderless";
}>();

const showPassword = ref(false);

const api = {
  post(url: string, data: { [key: string]: string }) {
    // Simulate API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          url === "/login" &&
          data.email === "admin@example.com" &&
          data.password === "password123"
        ) {
          resolve("Logged in successfully!");
        } else {
          reject("Invalid credentials!");
        }
      }, 1000);
    });
  },
};
</script>

<template>
  <form
    :class="{
      form: true,
      '-borderless': variant === 'borderless',
    }"
    @submit="handleSubmit"
  >
    <div class="form">
      <p class="form__title">{{ title }}</p>
      <div class="form__mail">
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" >
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
  font-family: $fontTitleFamily;
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
      font-family: $fontTitleFamily;
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
