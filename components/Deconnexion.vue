<script setup lang="ts">


// État de connexion de l'utilisateur
const isConnected = ref(false); // Initialise à "déconnecté"

// Vérifiez si l'utilisateur est connecté via le cookie au montage
const jwtCookie = useCookie("api_tracking_jwt");
if (jwtCookie.value) {
  isConnected.value = true; // Utilisateur connecté
}

// Fonction de déconnexion
const logout = async () => {
  try {
    // Supprimer le cookie localement
    jwtCookie.value = null;
    isConnected.value = false; // Marquer comme déconnecté

    // Redirection après déconnexion
    window.location.href = "/connexion";
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    alert("Une erreur est survenue lors de la déconnexion.");
  }
};

// Fonction pour rediriger vers la page de connexion
const goToLogin = () => {
  window.location.href = "/connexion";
};
</script>

<template>
  <div class="auth">
    <button 
      class="auth__button" 
      @click="isConnected ? logout() : goToLogin()"
    >
      {{ isConnected ? "Déconnexion" : "Se connecter" }}
    </button>
  </div>
</template>

<style lang="scss">
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  &__button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>