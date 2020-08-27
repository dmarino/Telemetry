//copyright (c) 2020 Daniela Mariño

'use strict'


import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";


import Result from './result.js'

export default class Connection{

    constructor(){
        var firebaseConfig = {
            apiKey: "AIzaSyDfkFkrtMGRcbKBIWLGEsoSr3DWV5NAmRQ",
            authDomain: "lt-sonar.firebaseapp.com",
            databaseURL: "https://lt-sonar.firebaseio.com",
            projectId: "lt-sonar",
            storageBucket: "lt-sonar.appspot.com",
            messagingSenderId: "798446817912",
            appId: "1:798446817912:web:b897377de739d3cd10138d",
            measurementId: "G-CE7TXYFCLK"
        };

        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
    }


    //gets all elements in a collection
    get(edge){

        const response = new Result()

        return new Promise(async(resolve, reject) => {

            let cmd = this._parseEdge(edge);
            const collection = this.db.collection(cmd.collection);

            let results = await collection.get()

            results.forEach(doc => {
                response.payload.push(doc.data());
            });

            response.ok();

            resolve(response)
        })

    }

    getById(edge){

        const response = new Result()

        return new Promise(async(resolve, reject) => {


            let cmd = this._parseEdge(edge);
            const collection = this.db.collection(cmd.collection);
            const query = collection.where("id", "==", cmd.params[0]);

            let docList = await query.get();
            response.payload = docList.docs();

            resolve(response)
        })

    }

    post(edge, data){
     
        const response = new Result()

        return new Promise(async(resolve, reject) => {

            console.log(data);

            let cmd = this._parseEdge(edge);
            const collection = this.db.collection(cmd.collection);
            
            //if it has an id it means it was stored before so is an update
            if(data.id){
                let ob = await collection.doc(data.id).set(Object.assign({}, data));
                response.payload = ob
            }
            else{

                let ob = await collection.doc();
                data.id = ob.id;
                data.recordedTime = new firebase.firestore.Timestamp(Date.now()/1000,0);
                ob.set(Object.assign({}, data));

                response.payload = data;
                response.ok();
            }

            resolve(response)
        })
    }

    _parseEdge(edge ="/"){

        const paramList = edge.split("/");
        return{
            collection: paramList[2],
            command : paramList[3],
            params : paramList.slice(4)
        }
    }
}
