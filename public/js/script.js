////Vue Components /////
Vue.component("modal-component", {
    template: "#modal-template",
    props: ["selectedImage"],
    data: function () {
        return {
            imgDetails: "",
            imgComments: [],
            cmtText: "",
            cmtUser: "",
        };
    },
    mounted: function () {
        let me = this;

        let urlAxiosAll = `/getall/${this.selectedImage}`;
        axios
            .get(urlAxiosAll)
            .then(function (response) {
                me.imgDetails = response.data[0];
                for (let i = 0; i < response.data.length; i++) {
                    me.imgComments.push(response.data[i]);
                }
            })
            .catch(function (err) {
                console.log("error in axios GET /getall/:imageId", err);
            });
    },
    methods: {
        submitComment: function (e) {
            e.preventDefault();
            let commentObj = {
                comment: this.cmtText,
                username: this.cmtUser,
                imageId: this.selectedImage,
            };
            let me = this;
            axios
                .post("/addcomment", commentObj)
                // .post("/addcomment", this.selectedImage)
                .then(function (response) {
                    // console.log("response from axios-post comment", response);
                    me.imgComments.unshift(response.data.rows[0]);
                    // console.log("response.data.rows[0]", response.data.rows[0]);
                })
                .catch(function (err) {
                    console.log("error in axios POST /addcomment", err);
                });
        },

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
        // selectedImage: location.hash.slice(1),
    },
    // all created functions are defined here
    methods: {
        submitImage: function (e) {
            e.preventDefault();
            // console.log("this: ", this);

            let formData = new FormData(); //we need this to send a *file*
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("file", this.file);
            //
            let me = this;
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
            // console.log("image was clicked", e);
            this.selectedImage = e;
        },
        closeModalFn: function () {
            this.selectedImage = null;
        },
    },
    mounted: function () {
        let me = this; //helps to pass the global "this"  (main data in vue) down to the function below
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
