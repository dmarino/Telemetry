<!--
VFS VUE Single File Component
Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <div class="admin">
        <div class="form-wrapper">
             <RecordForm></RecordForm>
        </div>
       
        <RecordList></RecordList>
    </div>

</template>
<script>
    import Controller from '@/../lib/controller'
    import RecordList from '../components/RecordList'
    import RecordForm from '../components/RecordForm'

    class AdminController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
        }


    }

    export default new AdminController('Admin',{RecordList, RecordForm});

</script>
<style>

.admin{
    display: grid;
    grid-template-areas:
        'form form list';
}
.form-wrapper{
    grid-area: form;
    padding: 5%;
}

.list{
    grid-area: list;
}

</style>
