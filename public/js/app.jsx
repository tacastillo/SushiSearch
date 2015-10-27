var Header = React.createClass({
    render: function() {
        return (
            <div>
                <nav className="orange lighten-2">
                <div className="wrapper">
                    <a href="#" className="brand-logo center">Sushi Search</a>
                </div>
            </nav>
                </div>)
    }
})

var Footer = React.createClass({
    render: function () {
        return (<footer className="page-footer orange lighten-3">
            <div className="footer-copyright">
                <div className="container">

                </div>
            </div>
        </footer>)
    }
})

var List = React.createClass({
    render: function() {
        if (this.props.results.length > 0) {
            return (
                <ul className="collection">
                    {this.props.results.map(function (item) {
                        return (<li className="collection-item avatar valign-wrapper" key={item.name}>
                            <img src={item.image} alt="" className="circle"/>
                            <div className="valign">
                                <strong className="title">{item.name}</strong>
                                <p>{item.ingredients.join(", ")}</p>
                            </div>
                        </li>)
                    })}
                </ul>)
        } else {
            return (
                <div id="no-results" className="valign-wrapper">
                    <div className="row valign">
                        <div className="col offset-m1 m10">
                            <div className="card orange lighten-2">
                                <div className="card-content white-text">
                                    <h1 className="center-align">No Results Found</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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
            <div className="results">
                <div id="input-wrapper">
                    <input type="text" placeholder="ex. crab, nori, eel..." onChange={this.searchMenu}/>
                </div>
                <List results={this.state.results}/>
            </div>
        )
    }
})

React.render(<Header />, document.getElementById('header'))
React.render(<Footer />, document.getElementById('footer'))
React.render(<Search />, document.getElementById('search'))