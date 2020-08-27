// Copyright (c) 2020 Daniela Mariño

'use strict';

export default class Record {

    constructor ( id, buildId, playerId, posX, posY, action ) {

        this.id = id;
        this.buildId = buildId;
        this.playerId = playerId;
        this.posX = posX;
        this.posY = posY;
        this.action = action;
        
    }
    
}