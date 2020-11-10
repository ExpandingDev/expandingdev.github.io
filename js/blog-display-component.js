var markdownConverter = new showdown.Converter();

Vue.component("blog-post", {
		data: function () { return {
		  title: "Blog Post",
		  markdown: "**Loading post...**",
		  posts: [],
		  postID: 0
		}},
		props: {
		  selectedId : Number // Use selected-id in the HTML
		},
		computed: {
		  htmlContent: function () {
		      return markdownConverter.makeHtml(this.markdown);
		  }
		},
    	methods: {
    	   refreshPost: function (id) {
    	    a=this;
    	    axios({
				method: "get",
				url: id + ".md",
				responseType: "text"
			}).then(function (response) {
				a.markdown = response.data;
			}).catch(function(error) {
			    this.title = "Error";
				this.content = "Uh Oh. We encountered an error while loading this blog post... Maybe try again later? :(";
			    console.error(error);
			});
    	   }
    	},
    	mounted: function () {
    	    if (this.selectedId) {
                this.postID = this.selectedId;   	    
    	    }
    	    else {
                this.postID = 0;
                console.log("Defaulted to 0");    	    
    	    }
    	    a=this;
    	    axios({
				method: "get",
				url: "manifest.json",
				responseType: "json"
			}).then(function (response) {
				a.posts = response.data.posts;
				a.title = a.posts[0].title;
				a.refreshPost(0);
			}).catch(function(error) {
			    a.title = "Error";
				a.content = "Uh Oh. We encountered an error while loading the manifest for this blog.... Maybe try again later? :(";
			    console.error(error);
			});
    	},
    	template: "<div class='blog-post' v-html='htmlContent'></div>"
	});