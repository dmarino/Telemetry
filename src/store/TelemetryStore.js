/*
VUEX Data Store.
Copyright (c) 2020. Jonathan, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'

import Connection from '@/../lib/connection.js'
const connection = new Connection()

import Record from './../models/TelemetryRecord.js'

export default {
    state: {
        records: [],
        actionTypes:[],
        recordsByAction:[],
        builds:[],
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

        loadActionTypes({commit}){

            connection.get('/api/ActionTypes')
            .then(data => data.error!=0? error =>{throw(error)} : data.payload)
            .then(payload =>{
                commit('SET_TYPES', payload)
                
            })

        },

        loadBuilds({commit}){

            connection.get('/api/Builds')
            .then(data => data.error!=0? error =>{throw(error)} : data.payload)
            .then(payload =>{
                commit('SET_BUILDS', payload)
                
            })

        },

        selectRecord({commit}, pos){
            commit('SELECT_RECORD', pos)
        },

        saveRecord({commit}, record, isNew){

            connection.post("/api/Telemetry", record)
                .then(data => data.error!=0? error =>{throw(error)} : data.payload) //here checks if there is an error in the server message
                .then(record => {
                    
                    //delete this cause now i don't need to add to the client records
                    //the event thing will handle the updating of the new records
                    //commit('ADD_RECORD', record);
                    
                })
                .catch(error=>{
                    alert(error); //shows the error to the user
                }); 
        },

        subscribeToRecords({commit}){

            //i know this should be on connection.js but i seriously wouldn't know how to call an action from the store there
            let doc = connection.db.collection('Telemetry');
            let observer = doc.onSnapshot(docSnapshot => {
                
                commit('SET_RECORDS',docSnapshot.docs.map(record=>{return record.data()}))
               
            }, err => {
                console.log(`Encountered error: ${err}`);
            });

        }
    },

    mutations: {
        SET_RECORDS: (state, records) => {state.records = records},
        SET_TYPES: (state, types) => {state.actionTypes = types},
        SET_BUILDS: (state, list) => {state.builds = list},
        ADD_RECORD: (state, record) => {state.records.push(record)},
        SELECT_RECORD: (state, pos) => {state.currentRecord = state.records[pos]},
    },

    getters: {
        records: state => { return state.records},
        actionTypes: state => { return state.actionTypes},
        builds: state => { return state.builds},
        currentRecord: state => {return state.currentRecord}
    },
}
