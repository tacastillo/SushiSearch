var Header = React.createClass({displayName: "Header",
    render: function() {
        return (
            React.createElement("nav", {className: "orange lighten-2"}, 
                React.createElement("div", {className: "wrapper"}, 
                    React.createElement("a", {href: "#", className: "brand-logo center"}, "Sushi Search")
                )
            ))
    }
})

var Footer = React.createClass({displayName: "Footer",
    render: function () {
        return (React.createElement("footer", {className: "page-footer orange lighten-2"}, 
            React.createElement("div", {className: "footer-copyright"}, 
                React.createElement("div", {className: "container"}

                )
            )
        ))
    }
})

var List = React.createClass({displayName: "List",
    render: function() {
        return (
            React.createElement("ul", {className: "collection"}, 
                this.props.results.map(function(item) {
                    return (React.createElement("li", {className: "collection-item avatar valign-wrapper", key: item.name}, 

                        React.createElement("img", {src: item.image, alt: "", className: "circle"}), 
                        React.createElement("div", {className: "valign"}, 
                            React.createElement("strong", {className: "title"}, item.name), 
                            React.createElement("p", null, item.ingredients.join(", "))
                        )
                    ))
                })
            ))
    }
})

var Search = React.createClass({displayName: "Search",
    searchMenu: function (event) {
        var results = this.state.menu
        //TODO Drop the runtime from O(N^2) to O(N), maybe using reduce()?
        results = results.filter(function(item){
            return item.ingredients.filter(function(ingredient) {
                return ingredient.toLowerCase().indexOf(
                    event.target.value.toLowerCase()) === 0
            }).length > 0
        })
        this.setState({results: results})
    },
    getInitialState: function () {
        if (this.props.results)
            return { results: this.props.results, menu: this.props.results }
        return {
            menu: [],
            results: []
        }
        //return {
        //    menu: [
        //        {
        //            name: "California Roll",
        //            ingredients: [
        //                "Crab", "Nori", "Sesame Seeds"
        //            ],
        //            image: "http://img1.rnkr-static.com/user_node_img/33/658358/C350/california-roll-foods-photo-u2.jpg"
        //        },
        //        {
        //            name: "Dragon Roll",
        //            ingredients: [
        //                "Eel", "Cucumber", "Avocado", "Crab", "Some", "other", "stuff", "and", "other", "ingredients"
        //            ],
        //            image: "http://img3.rnkr-static.com/user_node_img/50028/1000558855/C350/dragon-roll-foods-photo-u2.jpg"
        //        },
        //        {
        //            "_id": "5625f2b5bd5630bf25609c54",
        //            "name": "Tiger Roll",
        //            "ingredients": [
        //                "Roe",
        //                "Cucumber",
        //                "Avocado",
        //                "Mayonaisse",
        //                "Shrimp Tempura"
        //            ],
        //            "image": "http://img3.rnkr-static.com/user_node_img/50028/1000558846/C350/tiger-roll-foods-photo-u2.jpg"
        //        }
        //    ],
        //    results: []
        //}
    },
    componentWillMount: function () {
        var url = "http://localhost:5000/menu"
        var _this = this
        $.getJSON(url, function (result) {
            if(!result || !result.length)
                return []
            _this.setState({menu: result, result: result})
        })/*.bind(this)*/
        //this.setState({results: this.state.menu})

    },
    render: function () {
        return (
            React.createElement("div", {className: "results container"}, 
                React.createElement("div", {id: "input-wrapper"}, 
                    React.createElement("input", {type: "text", placeholder: "ex. crab, nori, eel...", onChange: this.searchMenu})
                ), 
                React.createElement(List, {results: this.state.results})
            )
        )
    }
})

React.render(React.createElement(Header, null), document.getElementById('header'))
React.render(React.createElement(Footer, null), document.getElementById('footer'))
React.render(React.createElement(Search, null), document.getElementById('search'))