var vm = new Vue({
		el: "#navbar",
		data: {
		  showBack: false,
		  tabs: [ { id:0, title: "Home", children:[], url: "index.php", expanded: false },
		          { id:1, title: "Blog", children:[], url: "blog/index.php", expanded: false },
		          { id:2, title:"About", children:[], url: "about.php", expanded: false },
		          { id:3, title: "Projects", children:[
                        { title: "JSGF Kit++", children:[], url: "projects/jsgf_kit.php" }, 
                        { title: "2Dimensions", children: [], url: "projects/jsgf_kit.php" }		          
		              ], expanded: false }
		           ],
		  topURL: "http://localhost/~rectangle/personal_website/" // Yeah this is kinda a hackish way of doing this but i really dont care
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