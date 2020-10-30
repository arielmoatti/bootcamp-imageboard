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
    watch: {
        selectedImage: function () {
            this.renderModal();
        },
    },
    mounted: function () {
        this.renderModal();
    },

    methods: {
        submitComment: function (e) {
            e.preventDefault();
            let commentObj = {
                comment: this.cmtText,
                username: this.cmtUser,
                imageid: this.selectedImage,
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
                        me.cmtText = "";
                        me.cmtUser = "";
                    } else {
                        // console.log("success is: ", response.data.success);
                        me.errmsg = true;
                    }
                })
                .catch(function (err) {
                    console.log("error in axios POST /addcomment", err);
                });
        },

        closeModal: function () {
            this.$emit("close");
        },

        renderModal: function () {
            let me = this;

            axios
                .get(`/getall/${this.selectedImage}`)
                .then(function (response) {
                    console.log("response", response);
                    if (response.data.length != 0) {
                        me.imgDetails = response.data[0];
                        for (let i = 0; i < response.data.length; i++) {
                            me.imgComments.push(response.data[i]);
                        }
                    } else {
                        me.closeModal();
                    }
                })
                .catch(function (err) {
                    console.log("error in axios GET /getall/:imageid", err);
                });
        },
    },
});

/////////////////////////Vue instance/////////////////////
new Vue({
    el: "#main",
    data: {
        images: [], //we leave it an empty array
        title: "", //placeholder
        description: "",
        username: "",
        file: null,
        errmsg: false,
        more: true,
        // selectedImage: null,
        selectedImage: location.hash.slice(1),
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
                        me.title = "";
                        me.description = "";
                        me.username = "";
                    } else {
                        // console.log("success is: ", response.data.success);
                        me.errmsg = true;
                    }
                })
                .catch(function (err) {
                    console.log("error in axios POST /upload", err);
                });
        },

        handleChange: function (e) {
            this.file = e.target.files[0]; //grabbing the file from the choose file button
        },

        // imageClick: function (e) {
        //     this.selectedImage = e;
        //     // console.log("selected image id: ", this.selectedImage);
        // },

        hideMessage: function () {
            this.errmsg = false;
        },

        closeModalFn: function () {
            // this.selectedImage = null;
            location.hash = "";
        },

        getMore: function () {
            // console.log("more clicked!");
            // console.log("images array", this.images);
            let lastid = this.images[this.images.length - 1].id;
            // console.log("lastid", lastid);
            let me = this;
            axios
                .get(`/moreimages/${lastid}`)
                .then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        me.images.push(response.data[i]);
                    }
                    if (
                        response.data[response.data.length - 1].id ===
                        response.data[0].lowestid
                    ) {
                        me.more = false;
                    }
                })
                .catch(function (err) {
                    console.log("error in axios GET /moreimages", err);
                });
        },
    },

    mounted: function () {
        let me = this;
        window.addEventListener("hashchange", function () {
            //
            me.selectedImage = location.hash.slice(1);
        });

        axios
            .get("/images")
            .then(function (response) {
                me.images = response.data.rows;
                if (
                    response.data.rows[response.data.rows.length - 1].id ===
                    response.data.lowestId
                ) {
                    me.more = false;
                }
            })
            .catch(function (err) {
                console.log("error in axios GET /images", err);
            });
    },
});
