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
            errmsg: false,
        };
    },
    mounted: function () {
        let me = this;

        axios
            .get(`/getall/${this.selectedImage}`)
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
                .then(function (response) {
                    // console.log("response", response);
                    if (response.data.success) {
                        me.imgComments.unshift(response.data.rows[0]);
                        // console.log("success is:", response.data.success);
                        me.errmsg = false;
                    } else {
                        // console.log("success is: ", response.data.success);
                        me.errmsg = true;
                    }
                })
                .catch(function (err) {
                    console.log("error in axios POST /addcomment", err);
                });
            if (me.errmsg) {
                me.cmtText = me.cmtUser = "";
            }
        },

        closeModal: function () {
            this.$emit("close");
        },
    },
});

////Vue instance/////
new Vue({
    el: "#main",
    data: {
        images: [], //we leave it an empty array
        title: "", //placeholder
        description: "",
        username: "",
        file: null,
        errmsg: false,
        selectedImage: null,
        // selectedImage: location.hash.slice(1),
    },
    methods: {
        submitImage: function (e) {
            e.preventDefault();
            let formData = new FormData(); //we need this to send a *file*
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("file", this.file);

            let me = this;
            axios
                .post("/upload", formData)
                .then(function (response) {
                    if (response.data.success) {
                        me.images.unshift(response.data.rows[0]);
                        // console.log("success is:", response.data.success);
                        me.errmsg = false;
                        me.file = null;
                    } else {
                        // console.log("success is: ", response.data.success);
                        me.errmsg = true;
                    }
                })
                .catch(function (err) {
                    console.log("error in axios POST /upload", err);
                });
            if (me.errmsg) {
                me.title = me.description = me.username = "";
            }
        },

        handleChange: function (e) {
            this.file = e.target.files[0]; //grabbing the file from the choose file button
        },

        imageClick: function (e) {
            this.selectedImage = e;
        },

        closeModalFn: function () {
            this.selectedImage = null;
        },
    },

    mounted: function () {
        let me = this; //helps to pass the global "this" (main data in vue) down to the function below
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
