console.log("index.js sanity!");

///////////Vue instance/////////////
new Vue({
    el: "#main",
    //this is our data object, which vue will render
    data: {
        name: "Ariel",
        seen: false,
        images: [], //we leave it an empty array
    },
    methods: {},
    mounted: function () {
        var me = this; //helps to pass the global "this"  (main data in vue) down to the function below
        axios.get("/images").then(function (response) {
            me.images = response.data;
        });
    },
});
