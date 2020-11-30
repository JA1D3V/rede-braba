<template>
  <div class="home">
    <h1>Novo post</h1>
    <textarea v-model="post" class="text_post"></textarea>
    <button class="post_btn" @click="post_message()">Postar</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewPost',
  data () {
    return {
      post: null
    }
  },
  methods: {
    post_message () {
      let token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : this.$router.push('/')
      let uid = sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : this.$router.push('/')
      axios.post('https://redesv.altiorem.dev/new_post.php', { uid, token, body: this.post})
        .then(x => {
          if (x.data.status === 'Success') {
            alert('Postagem realizada com sucesso!')
            this.$router.push('/feed')
          } else {
            alert('Erro ao postar')
          }
        })
        .catch(() => {
          alert('Erro ao postar')
        })
    }
  }
}
</script>

<style>
.text_post{
  height: 120px;
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(55, 55, 55, .15);
  padding: 6px;
  font-size: 12px;
}

.post_btn{
  margin: 16px;
  width: 50%;
  border: 1px solid #4c4c4c;
  border-radius: 4px;
  font-size: 18px;
  background: royalblue;
  color: #e6e6e6;
}
</style>