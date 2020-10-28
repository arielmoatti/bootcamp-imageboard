////Vue Components /////
Vue.component("modal-component", {
    //
    template: "#modal-template",
    props: ["selectedImage"],
    data: function () {
        return {
            component: "ariel",
            imgDetails: "",
        };
    },
    mounted: function () {
        console.log("props: ", this.selectedImage);
        // let passedUrl = "";
        let passedUrl = `/sel-images/${this.selectedImage}`;
        // console.log("passedUrl", passedUrl);
        var me = this;
        axios
            .get(passedUrl)
            .then(function (response) {
                console.log("response", response);
                me.imgDetails = response.data[0];
            })
            .catch(function (err) {
                console.log("error in axios GET /sel-images", err);
            });
    },
    methods: {
        closeModal: function () {
            this.$emit("close");
        },
    },
});

////Vue instance/////
new Vue({
    el: "#main",
    //this is our data object, which vue will render
    data: {
        images: [], //we leave it an empty array
        //data properties that will store values to Vue logic
        title: "", //placeholder
        description: "",
        username: "",
        file: null,
        selectedImage: null,
    },
    // all created functions are defined here
    methods: {
        handleClick: function (e) {
            e.preventDefault();
            // console.log("this: ", this);

            let formData = new FormData(); //we need this to send a *file*
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("file", this.file);
            //
            var me = this;
            axios
                .post("/upload", formData)
                .then(function (response) {
                    me.images.unshift(response.data.rows[0]);
                })
                .catch(function (err) {
                    console.log("error in axios POST /upload", err);
                });
        },
        handleChange: function (e) {
            this.file = e.target.files[0]; //grabbing the file from the choose file button
        },
        imageClick: function (e) {
            console.log("image was clicked", e);
            this.selectedImage = e;
        },
        closeModalFn: function () {
            this.selectedImage = null;
        },
    },
    mounted: function () {
        var me = this; //helps to pass the global "this"  (main data in vue) down to the function below
        axios
            .get("/images")
            .then(function (response) {
                me.images = response.data;
            })
            .catch(function (err) {
                console.log("error in axios GET /images", err);
            });
    },
});
