import { defineStore } from "pinia"

export const useRoutesStore=defineStore('routes',{
    state:()=>({
        routes:[],
        routeName:''
    }),
    actions:{
        addRoutes(value){
        this.routes.push(value)
        },
        changeRoutes(value){
            this.routes=value
        },
        changeRoute(value){
            this.routeName=value
        }
    },
    persist:true
})