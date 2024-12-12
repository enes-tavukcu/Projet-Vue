<script setup lang="ts">
const logout = async () => {
  try {

    // Supprimer le cookie localement
    const jwtCookie = useCookie("api_tracking_jwt");
    jwtCookie.value = null;

    // Redirection après déconnexion
    window.location.href = "/connexion";
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    alert("Une erreur est survenue lors de la déconnexion.");
  }
};
</script>

<template>
  <div class="deconnexion">
    <button class="deconnexion__button" @click="logout" >Déconnexion</button>
  </div>
</template>

<style scoped lang="scss">
.deconnexion {
  &__button {
    background: #ff4d4f;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #d4353a;
    }
  }
}
</style>