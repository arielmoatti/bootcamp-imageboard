let scrollLocation;
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
            errmsgmodal: false,
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
                    if (response.data.success) {
                        me.imgComments.unshift(response.data.rows[0]);
                        me.errmsgmodal = false;
                        me.cmtText = "";
                        me.cmtUser = "";
                    } else {
                        me.errmsgmodal = true;
                    }
                })
                .catch(function (err) {
                    console.log("error in axios POST /addcomment", err);
                });
        },

        closeModal: function () {
            this.$emit("close");
        },

        hideMessageModal: function () {
            this.errmsgmodal = false;
        },

        renderModal: function () {
            let me = this;

            axios
                .get(`/getall/${this.selectedImage}`)
                .then(function (response) {
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
        more: false,
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
                        axios
                            .get("/images")
                            .then(function (response) {
                                me.images = response.data.rows;

                                if (
                                    me.images[me.images.length - 1].id !==
                                    response.data.rows[0].lowestid
                                ) {
                                    me.more = true;
                                }
                            })
                            .catch(function (err) {
                                console.log("error in axios GET /images", err);
                            });

                        me.errmsg = false;
                        me.file = null;
                        me.title = "";
                        me.description = "";
                        me.username = "";
                    } else {
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

        hideMessage: function () {
            this.errmsg = false;
        },

        imageMouseenter: function () {
            // storing the scroll position before clicking on modal
            scrollLocation = $(document).scrollTop();
            // console.log("scrollLocation", scrollLocation);
        },

        closeModalFn: function () {
            location.hash = "";
            //sets the scroll position to where it was before modal render
            $(document).scrollTop(scrollLocation);
        },

        getMoreClick: function () {
            let lastid = this.images[this.images.length - 1].id;
            let me = this;
            axios
                .get(`/moreimages/${lastid}`)
                .then(function (response) {
                    if (response.data.length != 0) {
                        for (let i = 0; i < response.data.length; i++) {
                            me.images.push(response.data[i]);
                        }
                        if (
                            response.data[response.data.length - 1].id ===
                            response.data[0].lowestid
                        ) {
                            me.more = false;
                        }
                    }
                })
                .catch(function (err) {
                    console.log("error in axios GET /moreimages", err);
                });
        },
    },

    mounted: function () {
        let me = this;

        function infiniteScroll() {
            if (
                $(window).height() + $(document).scrollTop() >=
                $(document).height() - 150
            ) {
                // console.log("user has scrolled all the way down");
                me.getMoreClick();
            }
            setTimeout(infiniteScroll, 500);
        }
        /////////////////////////////// INFINITE SCROLL TOGGLE /////////////////////
        setTimeout(infiniteScroll, 500);
        /////////////////////////////// INFINITE SCROLL TOGGLE /////////////////////

        window.addEventListener("hashchange", function () {
            me.selectedImage = location.hash.slice(1);
        });

        axios
            .get("/images")
            .then(function (response) {
                me.images = response.data.rows;
                if (
                    response.data.rows[response.data.rows.length - 1].id !==
                    response.data.rows[0].lowestid
                ) {
                    me.more = true;
                }
            })
            .catch(function (err) {
                console.log("error in axios GET /images", err);
            });
    },
});
