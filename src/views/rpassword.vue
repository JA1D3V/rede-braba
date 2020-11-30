<template>
  <div class="home">
    <h1>Altere sua senha</h1>
    <input v-model="pwd">
    <button @click="rpwd()">Alterar</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Reset-password',
  data () {
    return {
      pwd: null
    }
  },
  methods: {
    rpwd () {
      axios.post('https://redesv.altiorem.dev/reset_pwd.php', { password: this.pwd, token: this.token })
        .then(x => {
          if (x.data.status === 'Success') {
            alert('Senha alterada com sucesso')
            this.$router.push(`/`)
          } else {
            alert(x.data.desc)
          }
        })
        .catch(() => {
          alert('Erro ao postar')
        })
    }
  },
  beforeMount () {
    if (window.location.search) {
      this.token = window.location.search.split('=')[1]
    }
  }
}
</script>

<style scoped>
.home input{
  border: none;
  padding: 6px;
  font-size: 16px;
  color: #1a1a1a !important;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(55, 55, 55, .35);
}

.home button{
  margin: 16px auto;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  padding: 4px;
  width: 50%;
}
</style>