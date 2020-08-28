<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="menu">
        <h1>GAME TELEMETRY</h1>
        
        <div class="navbar">

            <span class="nav-element" v-for="(item, index) in navMenu" :key="index">
                <router-link  class="router-link"   :to="{ name:item.section }">{{ item.section }}</router-link>
            </span>
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
    text-align: center;
}

.navbar{
    width: 100%;
    background-color: #ef476f;
}

.nav-element{
    display: inline-block;
    padding:0.5%;
    margin-right: 2%;
    width: 20%;
   
}

.nav-element:hover{
   
    background-color: #F47C98;
}

.router-link{

    color: white;
    font-size: 1.5em;
    text-decoration: none;

}

.router-link:hover{
 color:  #ef476f;
}

</style>
