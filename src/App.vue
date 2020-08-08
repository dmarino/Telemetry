<template>

    <main class="vue-main-rootcomponent">
      <Menu></Menu>
      <router-view></router-view>
    </main>

</template>
<script>
    // typical Vue component controller defined and registered here
    import Controller from '@/../lib/controller'
    import Store from '@/store.js'
    import Menu from '@/components/Menu.vue'

    class AppController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                title: 'Creative Tech Projects',
                subtitle: ''
            }
        }
    }

    // export a definition for this view
    export default new AppController('pgApp',{Menu});

</script>
<style>

html, body{

    width: 100%;
    height: 100%;
}

</style>
