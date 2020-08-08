<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="list">

        <button  @click="load()">Load Data</button>
        <ul>
            <li id="li-nav" v-for="(item, i) in records" :key="i" @click="select(i)">
                {{item.id}}
            </li>
        </ul>
    </div>

</template>

<script>
    import Controller from '@/../lib/controller'

    class ListController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
            }

            this.methods = {

                load() { 

                    this.loadRecords();

                },
                select(i){
                    this.selectRecord(i);
                }
            }

            
            this.injectGetters(['records']);
            this.injectActions(['loadRecords', 'selectRecord']);
        }
    }

    export default new ListController('tList');
</script>

<style scoped>

.list{
    width: 100%;
    height: 100%;
    border-style: dotted;
}

</style>
