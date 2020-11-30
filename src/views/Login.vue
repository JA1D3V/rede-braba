<template>
  <div class="home">
    <h1>Rede social Braba</h1>
    <ui-textbox placeholder="Nome de usuário" type="text" v-model="username"></ui-textbox>
    <ui-textbox placeholder="Senha" type="password" v-model="password"></ui-textbox>
    <ui-button class="mainbtn" size="normal" @click="login">Entrar</ui-button>
    <ui-button style="margin-top: 10px;" class="sndbtn" size="normal" @click="$router.push('/register')">Crie uma nova conta</ui-button>
    <ui-button style="margin-top: 10px;" class="sndbtn" size="normal" @click="$router.push('/fpwd')">Esqueci minha senha</ui-button>
    <ui-alert style="margin-top: 20px;" @dismiss="alert = null" type="error" v-show="alert">
      {{alert}}
    </ui-alert>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      username: null,
      password: null,
      alert: null
    }
  },
  methods: {
    login () {
      if (this.username && this.password) {
        axios.post('https://redesv.altiorem.dev/login.php', { username: this.username, password: this.password })
          .then(x => {
            console.log(x.data)
            if (x.data.status === 'success') {
              sessionStorage.setItem('token', x.data.token)
              sessionStorage.setItem('username', this.username)
              sessionStorage.setItem('uid', x.data.id)
              this.$router.push('/feed')
            } else {
              alert(x.data.desc)
            }
          })
          .catch(() => {
            alert("Erro ao realizar login, tente novamente")
          })
      } else {
        alert('Preencha todos os campos')
      }
    }
  }
}
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  background-color: #2BA84A;
  padding: 20px;
  text-align: center;
}

.ui-textbox__label-text {
  color: #eeeeee !important;
}

h1 {
  color: #eeeeee;
}

input {
  color: white !important;
}

</style>
