var markdownConverter = new showdown.Converter();

// Thanks to: https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript/
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

var blogApp = new Vue({
    el: "#blog-view",
    data: {
        postList: [],
        postId: -1,
        displayPost: false,
        selectedPost: null
    },
    computed: {
        reversedPostList: function () {
            return this.postList.reverse();
        }
    },
    mounted: function () {
        console.log("Loading blog post manifest...");
        var a = this;
        axios({
            method: "get",
            url: "blog/manifest.json",
            responseType: "json"
        }).then(function (response) {
            a.postList = response.data.posts;
            if(a.displayPost) {
                if(a.postList[a.postId] === undefined) {
                    a.selectedPost = { "error": "404" };                
                }
                else {
                    a.selectedPost = a.postList[a.postId];
                }  
            }
        }).catch(function(error) {
            console.error(error);
        });
    },
    created: function () {
        var postId = findGetParameter("p");
        if(postId == null) {
            this.displayPost = false;
        }
        else{
            this.postId = parseInt(postId);
            this.displayPost = true;        
        }
    }
});

/// Displays a small box/row with the title, date, and tags
Vue.component("blog-post-listing", {
    props: {
        post : Object
    },
    methods: {
        clicked: function () {
            window.location = BASE_URL + "view.html?p=" + this.post.id;   
        }
    },
    template: "<div class='blog-post-listing' v-on:click='clicked()' >\
    <span class='blog-post-date' >{{ post.date }}</span>\
    <h3>{{ post.title }}</h3>\
    <span class='blog-post-description' >{{ post.description }}</span><br />\
    <span class='blog-post-tag' v-for='t in post.tags' >{{ t }}</span></div>"
});

/// Displays the blog post title and the first 100-200 words with a "Read More" link at the bottom (and date and tags)
Vue.component("blog-post-preview", {
    data: function () { return{
        markdown: ""
    }},
    props: {
        post : Object
    },
    computed: {
        htmlContent: function () {
            return markdownConverter.makeHtml(this.markdown);
        }
    },
    mounted: function () {
        var a = this;
        axios({
            method: "get",
            url: "blog/" + a.post.id + ".md",
            responseType: "text"
        }).then(function (response) {
            a.markup = response.data;
        }).catch(function(error) {
            console.error(error);
        });
    },
    template: "<div class='blog-post-preview' ><h2>{{ post.title }}</h2><div class='blog-post-preview-content' v-html='htmlContent' ></div></div>"
});

Vue.component("blog-post", {
	data: function () { return {
        markdown: ""		
    } },
	props: {
	  post : Object
	},
	computed: {
	  htmlContent: function () {
	      return markdownConverter.makeHtml(this.markdown);
	  }
	},
	mounted: function () {
        if(this.post === undefined || this.post == null) {
            this.markdown = "# Uh Oh.\n We couldn't find that blog post...\n <br /> *You didn't just enter a random number, right?* :("; 
			return;        
        }
        else if (this.post.error == "404") {
	        this.markdown = "# 404 - Uh Oh.\n We couldn't find that blog post...\n <br />  *You didn't just enter a random number, right?* :("; 
			return; 
        }    	    
	    
	    var a = this;
	    axios({
			method: "get",
			url: "blog/" + a.post.id + ".md",
			responseType: "text"
		}).then(function (response) {
			a.markdown = response.data;
		}).catch(function(error) {
		    a.title = "Error";
			a.markdown = "# Uh Oh.\n We encountered an error while loading this blog post...\n *Maybe try again later?* :(";
		    console.error(error);
		});
	},
	updated: function () {
	      document.querySelectorAll('pre code').forEach((block) => {
            console.log("Running highlighter");
            hljs.highlightBlock(block);
          });  
	},
	template: "<div class='blog-post-content' ><div class='blog-post-title' >{{ post.title }}</div><div class='blog-post-date' >Posted by Tyler Sengia on: {{ post.date }}</div>\
	<span class='blog-post-tag' v-for='t in post.tags' >{{ t }}</span><br />\
	<div v-html='htmlContent' ></div></div>"
});