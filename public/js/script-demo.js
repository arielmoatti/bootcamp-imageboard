console.log("js sanity!");

//instance
new Vue({
    el: "#main",
    //this is our data object, which vue will render
    data: {
        name: "Ariel",
        seen: false,
        cities: [], //we leave it empty
        // cities: [
        //     {
        //         name: "Berlin",
        //         country: "Germany",
        //     },
        //     {
        //         name: "Paris",
        //         country: "France",
        //     },
        // ],
    },
    methods: {
        myMethod: function (cityName) {
            console.log("clicked!", cityName);
        },
        hoverMethod: function () {
            console.log("hovered!");
        },
    },
    mounted: function () {
        // console.log("mounted!!!");
        // console.log("this.name", this.name);
        // console.log("this.cities", this.cities);
        // this.names = [{}, {}];
        console.log("this.cities before axios", this.cities);
        console.log("this before axios", this);
        var me = this; //helps to pass the global "this"  (main data in vue) down to the function below
        axios.get("/cities").then(function (response) {
            console.log("me", me);
            // console.log("response", response);
            console.log("this inside then", this);
            console.log("this.cities inside then", this.cities);
            me.cities = response.data;
        });
    },
});
