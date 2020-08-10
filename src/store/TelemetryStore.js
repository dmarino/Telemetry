/*
VUEX Data Store.
Copyright (c) 2020. Daniela Mariño /i copy this from my lt sonar game i forgot to change the copyright 
*/
import Vue from 'vue'
import Vuex from 'vuex'

import Connection from '@/../lib/connection.js'
const connection = new Connection()

import Record from './../models/TelemetryRecord.js'

export default {
    state: {
        records: [],
        currentRecord: new Record()
    },

    actions: {

        loadRecords({commit}){

            connection.get('/api/Telemetry')
            .then(data => data.error!=0? error =>{throw(error)} : data.payload)
            .then(payload =>{
                commit('SET_RECORDS', payload)
                
            })
        },

        selectRecord({commit}, pos){

            commit('SELECT_RECORD', pos)
        },

        saveRecord({commit}, record){

            connection.post("/api/Telemetry", record)
                .then(data => data.error!=0? err =>{throw(error)} : data.payload) //here checks if there is an error in the server message
                .then(record => {
                    
                    commit('ADD_RECORD', record);
                    
                })
                .catch(error=>{
                    alert(error); //shows the error to the user
                }); 
        },

        updateCurrentRecord(){
            
        }

    },

    mutations: {
        SET_RECORDS: (state, records) => {state.records = records},
        ADD_RECORD: (state, record) => {state.records.push(record)},
        SELECT_RECORD: (state, pos) => {state.currentRecord = state.records[pos]},
    },

    getters: {
        records: state => { return state.records},
        currentRecord: state => {return state.currentRecord}
    },
}
