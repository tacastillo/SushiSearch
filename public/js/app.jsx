
var Header = React.createClass({
    render: function() {
        return (
            <nav className="orange lighten-2">
                <div className="wrapper">
                    <a href="#" className="brand-logo center">Sushi Search</a>
                </div>
            </nav>)
    }
})

var Footer = React.createClass({
    render: function () {
        return (<footer className="page-footer orange lighten-2">
            <div className="footer-copyright">
                <div className="container">
                    Sushi Search &copy; Timothy Castillo 2015
                </div>
            </div>
        </footer>)
    }
})

var List = React.createClass({
    render: function() {
        return (
            <ul className="collection">
                {this.props.results.map(function(item) {
                    return (<li className="collection-item avatar valign-wrapper" key={item.name}>

                        <img src={item.image} alt="" className="circle"/>
                        <div className="valign">
                            <strong className="title">{item.name}</strong>
                            <p>{item.ingredients.join(", ")}</p>
                        </div>
                    </li>)
                })}
            </ul>)
    }
})

var Search = React.createClass({
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
            menu: [
                {
                    name: "California Roll",
                    ingredients: [
                        "Crab", "Nori", "Sesame Seeds"
                    ],
                    image: "http://img1.rnkr-static.com/user_node_img/33/658358/C350/california-roll-foods-photo-u2.jpg"
                },
                {
                    name: "Dragon Roll",
                    ingredients: [
                        "Eel", "Cucumber", "Avocado", "Crab"
                    ],
                    image: "http://img3.rnkr-static.com/user_node_img/50028/1000558855/C350/dragon-roll-foods-photo-u2.jpg"
                }
            ],
            results: []
        }
    },
    componentWillMount: function () {
        this.setState({results: this.state.menu})
    },
    render: function () {
        return (
            <div className="results container">
                <input type="text" placeholder="ex. crab, nori, eel..." onChange={this.searchMenu}/>
                <List results={this.state.results}/>
            </div>
        )
    }
})

React.render(<Header />, document.getElementById('header'))
React.render(<Footer />, document.getElementById('footer'))
React.render(<Search />, document.getElementById('search'))