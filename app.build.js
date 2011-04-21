({
  baseUrl: "./",
  dir: "/build",
  appDir: "/src",
  skipModuleInsertion: false,

  modules: [
  {
    name: "main",
    include: [
    "jquery",
    "gears",
    "docController",
    "twitterFeedController"
    ]
  }
  ],

  paths: {
    "docController": "/lib/javascript/doc/docController",
		"docModel": "/lib/javascript/doc/docModel",
		"twitterFeed": "/lib/javascript/twitterFeed/twitterFeed",
		"twitterFeedController": "/lib/javascript/twitterFeed/twitterFeedController"
		"gears": "/lib/javascript/util/gears"
  }
})