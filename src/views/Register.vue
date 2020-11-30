<template>
  <div class="home">
    <h1>Rede social Braba</h1>
    <ui-textbox placeholder="Nome de usuário" type="text" v-model="name"></ui-textbox>
    <ui-textbox placeholder="Username" type="text" v-model="username"></ui-textbox>
    <ui-textbox placeholder="E-mail" type="text" v-model="email"></ui-textbox>
    <ui-textbox placeholder="Senha" type="password" v-model="password"></ui-textbox>
    <ui-button class="mainbtn" size="normal" @click="register">Cadastrar</ui-button>
    <ui-alert style="margin-top: 20px;" @dismiss="alert = null" type="error" v-show="alert">
      {{alert}}
    </ui-alert>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "NewPost",
  data () {
    return {
      username: null,
      email: null,
      password: null,
      name: null,
      file1: null
    }
  },
  methods: {
    register () {
      let formData = new FormData();
      formData.append("pict", this.file1);
      axios.post('https://redesv.altiorem.dev/upload.php', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(x => {
          if (x.data.status === 'success') {
            axios.post('https://redesv.altiorem.dev/register.php', { username : this.username, password: this.password, email: this.email, name: this.name, pp: x.data.fileName })
              .then(y => {
                if (y.data.status === 'Success') {
                  alert('Cadastro realizado com sucesso!')
                  this.$router.push('/')
                } else {
                  alert(y.data.desc)
                }
              })
          } else {
            alert(x.data.desc)
          }
        })
        .catch(() => {
          alert('Erro ao realizar upload de foto de perfil')
        })
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
