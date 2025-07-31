import { utilities } from "./v9/utilities.js";

let files = {
    events:{

    }
    ,types:{

    }
}


export class event{
    static find(id){
        return files[`events`][id];
    }
    static get(type){
        let events = files[`types`][type];
        if (!events)return; 
        let events_array = [];
        Object.keys(events).forEach((key)=>{
            events_array.push(this.find(key));
        })
        return events_array;
    }
    constructor(type, event){
        this.id = utilities.generateId();
        this.type = type;
        this.event = event.bind(this);
        window.addEventListener(this.type,this.event);
        files.events[this.id] = this;
        if (!files.types[this.type])files.types[this.type]={};
        files.types[this.type][this.id]=true;
    }
    remove(){
        if (!this.id)return;
        window.removeEventListener(this.type,this.event);
        delete files.events[this.id]
        delete files.types[this.type][this.id]
        if (Object.keys(files.types[this.type]).length==0)delete files.types[this.type];
        delete this.id;
        delete this.type;
        delete this.event;
    }
}