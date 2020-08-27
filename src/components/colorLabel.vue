<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="color-label">

        <div class="elements color-display" :style="style"></br></div>
        <div class="elements name">{{name}}</div>
    </div> 

</template>

<script>
    import Controller from '@/../lib/controller'

    class LabelController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.props = { // props are passed in when using this component
                name: String,
                color: String
            }
            this.computed= {
                style () {
                    return 'background: ' + this.color;
                }
            }
           
        }
    }

    export default new LabelController('color-label');
</script>

<style scoped>

.elements{
    display: inline-block;
    margin: 2%;
    width: 40%;
    height: 100%;
}
</style>
