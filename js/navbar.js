// Remember to change this before pushing to prod... no pressure :)
var BASE_URL = "https://expandingdev.github.io/";
//var BASE_URL = "http://localhost/~rectangle/expandingdev.github.io/";

var vm = new Vue({
		el: "#navbar",
		data: {
		  showBack: false,
		  tabs: [ { id:0, title: "Blog", children:[], url: "index.html", expanded: false },
		          { id:1, title:"About", children:[], url: "about.html", expanded: false },
		          { id:2, title: "Projects", children:[], url: "projects.html", expanded: false }
		           ]
		},
    	methods: {
    	   selectTab: function(t) {
    	       if(t.children.length == 0) {
    	           location = BASE_URL + t.url; // Relative links are a pain, but necessary
    	       }
    	       else {
    	           t.expanded = !t.expanded; // Toggle whether or not the category is expanded
    	       }
    	   }
    	},
	});