var Header = React.createClass({
    render: function() {
        return (
            <div>
                <nav className="orange lighten-2">
                <div className="wrapper">
                    <a href="#" className="brand-logo center">This Thing Needs a Better Name</a>
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

var AddButton = React.createClass({
    open: function() {
        $('#modal1').openModal();
    },
    render: function() {
        return (
            <div className="fixed-action-btn" id="fixed-btn" onClick={this.open}>
                <a href="#modal1" className="btn-floating btn-large red z-depth-1">
                    +
                </a>
            </div>)
    }
})

var InsertModal = React.createClass({
    getInitialState: function () {
        return {
            chips: []
        }
    },
    insert: function() {
        console.log($("#material-tags").materialtags('items'))
        $("#material-tags").empty()
    },
    render: function() {
        return ( /* jshint ignore:start */
        <div id="modal1" className="modal">
            <div className="modal-content">
                <h4>Add a New Roll</h4>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="sushi-name" type="text" className="validate"/>
                                <label htmlFor="sushi-name">Sushi Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s8 input-field">
                                <input id="material-tags" type="text" name="tags" value="" data-role="materialtags"/>
                                <label htmlFor="tags">Ingredients</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={this.insert} className=" modal-action modal-close waves-effect waves-orange btn-flat">Insert</a>
            </div>
        </div> /* jshint ignore:end */)
    }
})

var List = React.createClass({
    render: function() {
        if (this.props.results.length > 0) {
            return (
                <div id="collection-wrapper">
                    <ul className="collection ">
                        {this.props.results.map(function (item) {
                            return (<li className="collection-item avatar valign-wrapper" key={item.name}>
                                <img src={item.image} alt="" className="circle"/>
                                <div className="valign">
                                    <strong className="title">{item.name}</strong>
                                    <p>{item.ingredients.join(", ")}</p>
                                </div>
                            </li>)
                        })}
                    </ul>
                </div>)
        } else {
            return (
                <div id="no-results" className="valign-wrapper">
                    <div className="row valign">
                        <div className="col offset-m1 m10">
                            <div className="card orange lighten-2 z-depth-3">
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
        var input = event.target.value.toLowerCase()
        results = results.filter(function(item){
            return item.ingredients.filter(function(ingredient) {
                return ingredient.toLowerCase().indexOf(input) === 0
            }).length > 0 ||
                item.name.toLowerCase().toLowerCase().indexOf(input) === 0
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
                <div id="input-wrapper" className="input-field">
                    <input type="text" placeholder="ex. crab, nori, eel..." onChange={this.searchMenu}/>
                </div>
                <List results={this.state.results}/>
            </div>)
    }
})

React.render(<Header />, document.getElementById('header'))
React.render(<Footer />, document.getElementById('footer'))
React.render(<Search />, document.getElementById('search'))
React.render(<AddButton />, document.getElementById('add'))
React.render(<InsertModal />, document.getElementById('modal'))
