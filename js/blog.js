var blogVM = new Vue({
		el: "#content",
		data: {
		  title: "Blog",
		  content: "Loading...",
		  posts: [],
		  postID: 0
		},
    	methods: {
    	   
    	},
    	mounted: function () {
    	    /*axios({
				method: "get",
				url: "manifest.json",
				responseType: "json"
			}).then(function (response) {
			    console.log(response);
				blogVM.posts = response.data.posts;
				var mostRecentPost = blogVM.posts[blogVM.posts.length-1];
			}).catch(function(error) {
			    blogVM.title = "Error";
				blogVM.content = "Uh Oh. We encountered an error while loading the manifest for this blog.... Maybe try again later? :(";
			    console.error(error);
			});*/
    	}
	});