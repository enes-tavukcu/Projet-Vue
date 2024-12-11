<script setup lang="ts">
const title = ref('')
const description = ref('')

const emit = defineEmits(['habit:created'])



async function onSubmit() {
    
    try {

        await useTrackingApi('/habits', {
            method: 'POST',
            body: { title: title.value, description: description.value },
        })
        emit('habit:created')

    } catch (err) {
        console.log(err)
    }
}

</script>

<template>
  <div class="container">
    <h2>Ajouter une nouvelle habitude</h2>
      <form @submit.prevent="onSubmit">
        <label for="title">Titre de l'habitude :</label>
        <input id="title" v-model="title" type="text" >
  
        <label for="description">Description :</label>
        <input id="description" v-model="description" type="text" >
  
        <button type="submit">Ajouter</button>
      </form>
  </div>
</template>

<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  margin: 20px auto; /* Centrer le formulaire */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fdfdfd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  button {
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:active {
      transform: scale(0.98); /* Réduction légère à l'appui */
    }
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #28a745; /* Vert pour le succès */
    &.error {
      color: #dc3545; /* Rouge pour les erreurs */
    }
  }
}

/* Titre */
h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Responsiveness */
@media (max-width: 768px) {
  form {
    padding: 15px;
    width: 90%;
  }

  input,
  button {
    font-size: 14px;
  }

  h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  form {
    padding: 10px;
  }

  h2 {
    font-size: 18px;
  }

  button {
    padding: 10px;
    font-size: 14px;
  }
}
</style>