var Header = React.createClass({displayName: "Header",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("nav", {className: "orange lighten-2"}, 
                React.createElement("div", {className: "wrapper"}, 
                    React.createElement("a", {href: "#", className: "brand-logo center"}, "Sushi Search")
                )
            )
                ))
    }
})

var Footer = React.createClass({displayName: "Footer",
    render: function () {
        return (React.createElement("footer", {className: "page-footer orange lighten-3"}, 
            React.createElement("div", {className: "footer-copyright"}, 
                React.createElement("div", {className: "container"}

                )
            )
        ))
    }
})

var AddButton = React.createClass({displayName: "AddButton",
    open: function() {
        $('#modal1').openModal();
    },
    render: function() {
        return (
            React.createElement("div", {className: "fixed-action-btn", id: "fixed-btn", onClick: this.open}, 
                React.createElement("a", {href: "#modal1", className: "btn-floating btn-large red z-depth-1"}, 
                    "+"
                )
            ))
    }
})

//var IngredientInputs = React.create({
//
//})

var InsertModal = React.createClass({displayName: "InsertModal",
    click: function () {

    },
    render: function() {
        return (
        React.createElement("div", {id: "modal1", className: "modal"}, 
            React.createElement("div", {className: "modal-content"}, 
                React.createElement("h4", null, "Add a New Roll"), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("form", {className: "col s12"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "input-field col s6"}, 
                                React.createElement("input", {id: "sushi-name", type: "text", className: "validate"}), 
                                React.createElement("label", {htmlFor: "sushi-name"}, "Sushi Name")
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "input-field col s4", id: "ingredient-input"}, 
                                React.createElement("input", {placeholder: "Ingredient", type: "text", className: "validate"}), 
                                React.createElement("label", {htmlFor: "ingredient-input"}, "Ingredient")
                            ), 
                            React.createElement("div", {className: "input-field col cs2", id: "insert-ingredient-button"}, 
                                React.createElement("a", {onClick: this.click, className: "btn-floating btn-small waves-effect waves-light blue"}, 
                                    "+"
                                )
                            )
                        )
                    )
                )
            ), 
            React.createElement("div", {className: "modal-footer"}, 
                React.createElement("a", {href: "#!", className: " modal-action modal-close waves-effect waves-orange btn-flat"}, "Agree")
            )
        ))
    }
})

var List = React.createClass({displayName: "List",
    render: function() {
        if (this.props.results.length > 0) {
            return (
                React.createElement("div", null, 
                    React.createElement("ul", {className: "collection "}, 
                        this.props.results.map(function (item) {
                            return (React.createElement("li", {className: "collection-item avatar valign-wrapper", key: item.name}, 
                                React.createElement("img", {src: item.image, alt: "", className: "circle"}), 
                                React.createElement("div", {className: "valign"}, 
                                    React.createElement("strong", {className: "title"}, item.name), 
                                    React.createElement("p", null, item.ingredients.join(", "))
                                )
                            ))
                        })
                    )
                ))
        } else {
            return (
                React.createElement("div", {id: "no-results", className: "valign-wrapper"}, 
                    React.createElement("div", {className: "row valign"}, 
                        React.createElement("div", {className: "col offset-m1 m10"}, 
                            React.createElement("div", {className: "card orange lighten-2 z-depth-3"}, 
                                React.createElement("div", {className: "card-content white-text"}, 
                                    React.createElement("h1", {className: "center-align"}, "No Results Found")
                                )
                            )
                        )
                    )
                )
            )
        }
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
        return {
            menu: [],
            results: []
        }
    },
    componentDidMount: function () {
        var url = "http://localhost:5000/menu"
        $.get(url, function(result) {
            if (this.isMounted()) {
                this.setState({
                    menu: result,
                    results: result
                })
            }
        }.bind(this))
    },
    render: function () {
        return (
            React.createElement("div", {className: "results"}, 
                React.createElement("div", {id: "input-wrapper", className: "input-field"}, 
                    React.createElement("input", {type: "text", placeholder: "ex. crab, nori, eel...", onChange: this.searchMenu})
                ), 
                React.createElement(List, {results: this.state.results})
            ))
    }
})

React.render(React.createElement(Header, null), document.getElementById('header'))
React.render(React.createElement(Footer, null), document.getElementById('footer'))
React.render(React.createElement(Search, null), document.getElementById('search'))
React.render(React.createElement(AddButton, null), document.getElementById('add'))
React.render(React.createElement(InsertModal, null), document.getElementById('modal'))
