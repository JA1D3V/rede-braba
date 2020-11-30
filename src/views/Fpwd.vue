<template>
  <div class="home">
    <h2>Digite seu e-mail para recuperar sua senha:</h2>
    <input v-model="email">
    <button @click="fpwd()">Recuperar</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Fpwd',
  data () {
    return {
      email: null
    }
  },
  methods: {
    fpwd () {
      axios.post('https://redesv.altiorem.dev/forgot_pwd.php', { email: this.email})
        .then(x => {
          if (x.data.status === 'success') {
            alert('O envio de e-mails não pode ser configurado :( redirecionando para página de alteração de senha')
            this.$router.push(`/rpassword?token=${x.data.token}`)
          } else {
            alert(x.data.desc)
          }
        })
        .catch(() => {
          alert('Erro ao postar')
        })
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  background-color: #2BA84A;
  padding: 20px;
  text-align: center;
  color: #1a1a1a;
}

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