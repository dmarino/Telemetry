/** 
 * 
 * Copyright (C) 2020 Daniela Marino
*/

export default class Result{

    constructor(error=-1, errorMsg="unknown error", payload=[]){
        this.error = error;
        this.errorMsg = errorMsg;
        this.payload = payload;
    }


    ok(){
        this.error=0;
        this.errorMsg="";
        return this;
    }

    serialize(){
        return JSON.stringify(this);
    }
}