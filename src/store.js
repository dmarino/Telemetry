/*
VUEX Data Store.
Copyright (c) 2020. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use( Vuex )

// Modules
import TelemetryStore from './store/TelemetryStore.js'

// Store with modules
const store = new Vuex.Store({
    modules: {
        TelemetryStore
    }
});

export default store;