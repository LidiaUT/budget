<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" v-on:click.prevent="$emit('clickMenu')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="white-text">{{ datum }}</span>
      </div>

      <a class="waves-effect waves-light btn" v-on:click.prevent="logout">Logi välja</a>

    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    datum: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      // console.log('Logout Navbar')
      this.$router.push('/login?message=logout')
      // this.msg = window.M.toast({ html: 'toast asi: You are logged out' }) // analog nawemy sozdannomu message.plugin, beretsja iz materializecss.com
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.datum = new Date().toLocaleDateString('et-ET', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }) + '   ' + new Date().toLocaleTimeString('et-ET')
      // ili prosto this.date = new Date().toLocaleString('et-ET')
    })
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, { // videos on ilma window. Vaata node-materialize css-dist-js-materialize.js, kus dropdown on seotud window.M.Dropdown'iga. Alternatiiv: /* global M */ export ette ja siis lihtsalt M.Dropdown.init
      constrainWidth: true,
      coverTrigger: false
    })
  },
  beforeUnmount () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
