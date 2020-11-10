var vm = new Vue({
		el: "#navbar",
		data: {
		  showBack: false,
		  tabs: [ { id:0, title: "Home", children:[], url: "index.html", expanded: false },
		          { id:1, title: "Blog", children:[], url: "blog/index.html", expanded: false },
		          { id:2, title:"About", children:[], url: "about.html", expanded: false },
		          { id:3, title: "Projects", children:[], url: "projects.html", expanded: false }
		           ],
		  topURL: "http://expandingdev.github.io/" // Yeah this is kinda a hackish way of doing this but i really dont care
		},
    	methods: {
    	   selectTab: function(t) {
    	       if(t.children.length == 0) {
    	           location = this.topURL + t.url; // Relative links are a pain, but necessary
    	       }
    	       else {
    	           t.expanded = !t.expanded; // Toggle whether or not the category is expanded
    	       }
    	   }
    	},
	});