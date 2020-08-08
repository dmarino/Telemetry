/*
VUE App's MAIN Component.
Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
'use strict';

import Vue from 'vue'
import Router from 'vue-router';
Vue.use( Router );


import Admin from '@/routes/Admin.vue'
import Charts from '@/routes/Charts.vue'

export default new Router({
    routes: [
        { path:"/",                 name:"Admin", component:  Admin},
        { path:"/Admin",                 name:"Admin", component:  Admin},
        { path:"/Charts",                name:"Charts", component:  Charts},
    ]
});