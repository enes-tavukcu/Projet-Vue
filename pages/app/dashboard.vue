<script lang="ts" setup>
import { ref } from 'vue';

// Charger les habitudes à partir de l'API
const { data, refresh } = await useAsyncData('dashboard', async () => {
const response = await fetch('http://localhost:4000/dashboard', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
  }
})

return await response.json();
})

function onHabitCreated () {
    console.log('Une nouvelle habitude à été créée.')
    // Rafraîchir la liste des habitudes
    refresh()
}

const message = ref('');


// Fonction pour supprimer une habitude
const deleteHabit = async (habitId: number) => {
  const habitResponse = await fetch(`http://localhost:4000/habits/${habitId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
    },
  });

  if (habitResponse.ok) {
    // Supprimer l'habitude de la liste locale
    refresh();
    message.value = 'Habitude supprimée avec succès.';
  } else {
    message.value = "Erreur lors de la suppression de l'habitude.";
  }
};
</script>


<template>
    <div>
      <h1>Mon dashboard</h1>
  
        <!-- Afficher les données brutes -->
    <div>
      <pre>{{ data }}</pre>
    </div>

    <!-- Habitudes globales -->
    <h2>Habitudes Globales</h2>
    <ul>
      <li v-for="(habit, index) in data.globalHabits" :key="index">
        {{ habit.title }} : {{ habit.description }}
      </li>
    </ul>

      <!-- Habitudes personnelles -->
      <h2>Habitudes Personnelles</h2>
      <ul>
        <li v-for="(habit, index) in data.personalHabits" :key="index">
          {{ habit.title }} : {{ habit.description }}
          <button style="margin-left: 10px; background-color: red; color: white;" @click="deleteHabit(habit.id)">
            Supprimer
          </button>
        </li>
      </ul>
  
      

      <AddHabitForm @habit:created="onHabitCreated"/>
  
      <!-- Message de statut -->
      <p>{{ message }}</p>
    </div>
  </template>
  

<style lang="scss">
/* Style basique */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button[style*="red"] {
  background-color: red;
  color: white;
  border: none;
}

button[style*="red"]:hover {
  background-color: darkred;
}

</style>
