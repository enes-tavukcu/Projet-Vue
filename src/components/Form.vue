<script setup lang="ts">
import MyButton from "@/components/Button.vue";
import { ref } from "vue";
import Eye from "./icons/Eye.vue";
import EyeClose from "./icons/EyeClose.vue";

const email = ref("");
const password = ref("");

function handleSubmit() {
  alert(email.value, password.value);
  api.post("/login", { email: email.value, password: password.value });
}

const showPassword = ref(false);

const api = {
  post(url: string, data: any) {
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
  <form @submit.prevent="handleSubmit">
    <div class="form">
      <p class="form__title">Connexion</p>
      <div class="form__mail">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="form__password">
        <label for="password">Password</label>
        <div class="form__password__input">
          <input
            :type="showPassword ? 'text' : 'password'"
            name="password"
            v-model="password"
          />
          <div
            type="button"
            class="form__password__toggle"
            @click="(showPassword = !showPassword)"
          >
            <Eye v-if="!showPassword" />
            <EyeClose v-else />
          </div>
        </div>
      </div>

      <div class="form__submit">
        <MyButton type="submit" class="button -large">Connexion</MyButton>
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
  padding: 15px;
  font-family: $fontTitleFamily;
  box-shadow: 0 0 10px #ccc;

  &__mail,
  &__password {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 12px;
      font-weight: 600;
    }
    input {
      padding: 10px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;
      width: 90%;
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
    font-weight: 600;
    text-align: center;
  }
  &__password__toggle {
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: none;
    position: absolute;
    right: 3%;
  }
}
</style>
