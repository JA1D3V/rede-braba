<template>
  <div class="feed">
    <ui-toolbar id="header" title="Rede social braba">
      <div slot="actions">
          <ui-icon-button
              color="black"
              icon="refresh"
              size="large"
              type="secondary"
              @click="() => { feedData = 'fetching'; fetchFeed() }"
          ></ui-icon-button>

          <ui-icon-button
              color="black"
              has-dropdown
              icon="more_vert"
              ref="dropdownButton1"
              size="large"
              type="secondary"
          >
              <ui-menu
                  contain-focus
                  has-icons
                  slot="dropdown"
                  :options="menuOptions"
                  @close="$refs.dropdownButton1.closeDropdown()"
              ></ui-menu>
          </ui-icon-button>
      </div>
    </ui-toolbar>
    <div class="feed-itself">        
      <ui-progress-circular style="margin-top: 20px;" color="multi-color" v-show="feedData === 'fetching'"></ui-progress-circular>
      <div v-if="feedData !== 'fetching'" class="feed-item" v-for="item in feedData" :key="item.id">
        <div style="word-break: break-all;">
          <h4><b>{{item.body}}</b></h4>
        </div>
        <p>por: {{item.username}} em {{item.created_at}}</p>
        <ui-button color="red" class="btn btn-danger" v-if="item.username === username" @click="deletePost(item.id)">Excluir</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Feed',
  data () {
    return {
      menuOptions: [
        {
          id: 'perfil',
          label: 'Seu Perfil',
          icon: 'person',
          secondaryText: 'Ctrl+E'
        },
        {
          id: 'perfil',
          label: 'Sair',
          icon: 'exit_to_app',
          secondaryText: 'Ctrl+E'
        },
        {
          id: 'perfil',
          label: 'Criar postagem',
          icon: 'add',
          secondaryText: 'Ctrl+E',
          href: '/new_post'
        }
      ],
      feedData: 'fetching'
    }
  },
  methods: {
    fetchFeed () {
      let tk = sessionStorage.getItem('token')
      if (tk) {
        axios.get('https://redesv.altiorem.dev/all_posts.php', { headers: { Token: tk } })
          .then(x => {
            this.feedData = x.data.status === "success" ? x.data.data.reverse() : 'ERR'
          })
          .catch(() => {
            alert("Erro ao recuperar Feed")
          })
      } else {
        this.$router.push('/')
      }
    },
    deletePost (id) {
      let uid = sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : this.$router.push('/')
      let tk = sessionStorage.getItem('token')
      axios.post('https://redesv.altiorem.dev/delete_post.php', { token: tk, uid, id })
        .then(x => {
          console.log(x.data)
          if (x.data.status === 'Success') {
            alert('Post deletado com sucesso')
            this.fetchFeed()
          } else {
            alert('Erro ao deletar postagem')
          }
        })
        .catch(() => {
          alert("Erro ao recuperar Feed")
        })
    }
  },
  mounted () {
    this.username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : this.$router.push('/')
    this.fetchFeed()
  }
}
</script>

<style>
.feed {
  width: 100%;
  height: 100vh !important;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: hidden;
}

.feed-itself {
  width: 90vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  max-height: calc(100vh - 48px) !important;
  overflow-y: auto !important;
}

#header {
  width: 100%;
  background-color: #2BA84A;
  color: #eeeeee;
}

.feed-item {
  background-color: rgb(54, 211, 132);
  padding: 25px;
  margin: 10px;
  text-align: left;
  border-radius: 10px;
  width: 90vw;
}
</style>
