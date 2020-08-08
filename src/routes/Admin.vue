<!--
VFS VUE Single File Component
Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <div class="admin">
        <RecordForm></RecordForm>
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

    width: 100%;
    height: 100%;
}
</style>
