<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="list">

        <h2>List Of Records</h2>
        <ul>
            <li class="li-element" v-for="(item, i) in records" :key="i" @click="select(i)">
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

                    console.log(this.records.length)
                    this.loadRecords();

                },
                select(i){
                    this.selectRecord(i);
                }
            }

            
            this.injectGetters(['records']);
            this.injectActions(['loadRecords', 'selectRecord']);
        }

        vue_mounted(){
            this.loadRecords();
        }
    }

    export default new ListController('tList');
</script>

<style scoped>

.list{
    height: 100%;
    border-style: dotted;
    padding-left: 2%;
}

.li-element:hover{

    cursor: pointer;
    font-weight: bold;
}

</style>
