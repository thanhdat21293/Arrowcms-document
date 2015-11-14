"use strict";

module.exports = {
    feature: {
        "path": {
            "folder": "/features",
            "file": "feature.js"
        },
        "controller": [
            {
                "path": {
                    "name": "backend",
                    "folder": "backend/controllers",
                    "file": "*.js"
                }
            },
            {
                "path": {
                    "name": "frontend",
                    "folder": "frontend/controllers",
                    "file": "*.js"
                }
            }
        ],
        "view": [
            {
                "path": {
                    "name": "backend",
                    "folder": [
                        "/themes/backend/:backendTheme/features/$component",
                        "backend/views",
                        "/themes/backend/:backendTheme/layouts"
                    ]
                }
            },
            {
                "path": {
                    "name": "frontend",
                    "folder": [
                        "/themes/frontend/:frontendTheme/features/$component",
                        "frontend/views",
                        "/themes/frontend/:frontendTheme/layouts"
                    ]
                }
            }
        ],
        "model": {
            "path": {
                "folder": "models",
                "file": "*.js"
            }
        },
        "route": [
            {
                "path": {
                    "name": "backend",
                    "folder": "backend",
                    "file": "route.js",
                    "prefix": "/admin"
                }
            },
            {
                "path": {
                    "name": "frontend",
                    "folder": "frontend",
                    "file": "route.js"
                }
            }
        ]
    },
    widget: {
        "path": {
            "folder": "/widgets",
            "file": "widget.js"
        },
        "controller": {
            "path": {
                "folder": "controllers",
                "file": "*.js"
            }
        },
        "view": {
            "path": {
                "folder": [
                    "/themes/frontend/:frontendTheme/widgets/$component",
                    "/views"
                ]
            }
        },
        "extends" : {
            // Demo extends
            "getLayouts": function (widget) {
                // Get all widget layouts
                console.log("\x1b[32m", "Widget: Get all layouts", "\x1b[0m");
            }
        }
    }
};