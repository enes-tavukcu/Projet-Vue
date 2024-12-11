<script lang="ts" setup>
import { ref } from 'vue';

const habitToEdit = ref<Habit|null>(null);

interface Habit {
  id: number; // L'identifiant unique de l'habitude
  title: string; // Le titre de l'habitude
  description: string; // Une description de l'habitude
  createdAt?: string; // Date de création (facultative)
  updatedAt?: string; // Date de mise à jour (facultative)
}


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

function onHabitModified () {
  refresh()
}

const message = ref('');

const toggleEditHabit = (habit: Habit) => {
  // Si l'utilisateur clique à nouveau sur le même bouton, fermer le formulaire
  if (habitToEdit.value?.id === habit.id) {
    habitToEdit.value = null;
  } else {
    habitToEdit.value = habit; // Ouvrir le formulaire pour l'habitude cliquée
  }
};

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
        <!-- <pre>{{ data }}</pre> -->

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
          <Button style="margin-left: 10px; background-color: red; color: white;" @click="deleteHabit(habit.id)">
            Supprimer
          </Button>
          <Button style="margin-left: 10px;" @click="toggleEditHabit(habit)">Modifier</Button>
        </li>
      </ul>
  
      
      <div class="formulaire">
      <AddHabitForm @habit:created="onHabitCreated"/>

      <ModifHabitForm v-if="habitToEdit" :habit="habitToEdit" @habit:modified="onHabitModified" />

    </div>
      <!-- Message de statut -->
      <p>{{ message }}</p>
    </div>
  </template>
  

<style lang="scss">

.formulaire {
  display: flex
;
    align-items: flex-start;
    justify-content: space-evenly;
  
    @include small-down() {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }
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
