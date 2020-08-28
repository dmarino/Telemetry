<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="record-form">

        <form @submit.prevent="saveInfo(currentRecord.buildId, currentRecord.playerId, currentRecord.posX, currentRecord.posY, currentRecord.action)">
            <select id="build_input" v-model="currentRecord.buildId">
                <option  v-for="(item, i) in builds" :key="i" :value="item.id">{{item.id}}</option>
            </select>
            <input  id="player_input" type="text" v-model="currentRecord.playerId" placeholder="player ID">
            <input  id="x_input" type="number" v-model="currentRecord.posX" placeholder="X pos">
            <input  id="y_input" type="number" v-model="currentRecord.posY" placeholder="Y pos">
            <select id="action" v-model="currentRecord.action">
                <option  v-for="(item, i) in actionTypes" :key="i" :value="item.name">{{item.name}}</option>
            </select>
            <button id="name_btn" value="Submit"> OK</button>
        </form>
    </div>

</template>
<script>
    import Controller from '@/../lib/controller'
    import Record from './../models/TelemetryRecord.js'

    class FormController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                buildId:"",
                playerId:"",
                posX : 0.0,
                posY : 0.0,
                action : ""

            }

            this.methods = {
                saveInfo(buildId, playerId, posX, posY, action){
                   
                    var record = new Record();
                    record.buildId = buildId;
                    record.playerId = playerId;
                    record.posX = posX;
                    record.posY = posY;
                    record.action = action;

                    if(this.currentRecord.id !== undefined){
                        
                        record.id = this.currentRecord.id;
                        record.recordedTime = this.currentRecord.recordedTime
                    }
                    
                    this.saveRecord(record);
                }
            }

            this.injectGetters(['currentRecord', 'actionTypes', 'builds']);
            this.injectActions(['saveRecord','loadActionTypes','loadBuilds']);
        }

        vue_mounted(){
            this.loadActionTypes();
            this.loadBuilds();
        }
    }

    export default new FormController('tForm');
</script>
<style scoped>

.record-form{

    padding: 2%;
    border-style: dotted;   
    height: 50%;
}

input{
    margin: 2%;
}
</style>
