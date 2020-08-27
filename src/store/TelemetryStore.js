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
        chartData:{
            datasets:[{
                backgroundColor: 'rgba(179,181,198,0.8)',
                data:[{
                    x: 20,
                    y: 30,
                    r: 10

                }]
            }]
        },
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

        selectRecord({commit}, pos){

            commit('SELECT_RECORD', pos)
        },

        saveRecord({commit}, record){

            connection.post("/api/Telemetry", record)
                .then(data => data.error!=0? error =>{throw(error)} : data.payload) //here checks if there is an error in the server message
                .then(record => {
                    
                    commit('ADD_RECORD', record);
                    
                })
                .catch(error=>{
                    alert(error); //shows the error to the user
                }); 
        }
    },

    mutations: {
        SET_RECORDS: (state, records) => {state.records = records},
        SET_TYPES: (state, types) => {state.actionTypes = types},
        ADD_RECORD: (state, record) => {state.records.push(record)},
        SELECT_RECORD: (state, pos) => {state.currentRecord = state.records[pos]},
    },

    getters: {
        records: state => { return state.records},
        actionTypes: state => { return state.actionTypes},
        currentRecord: state => {return state.currentRecord}
    },
}
