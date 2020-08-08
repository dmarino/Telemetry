<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="menu">
        <h1>GAME TELEMETRY</h1>
        
        <div class="navbar">
            <ul id="ul-nav">
                <li id="li-nav" v-for="(item, index) in navMenu" :key="index">
                    <router-link :to="{ name:item.section }">{{ item.section }}</router-link>
                </li>
            </ul>
        </div>
        
    </div>

</template>
<script>
    import Controller from '@/../lib/controller'

    class MenuController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {

                navMenu:[
                    { section: "Admin" },
                    { section: "Charts" }
                ]   
            }

        }
    }

    export default new MenuController('tMenu');

</script>
<style scoped>

.menu{
    width: 100%;
    height: 5%;
    text-align: center;
}

</style>
