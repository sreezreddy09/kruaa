var React = require("react");

var App = React.createClass({
    getInitialState : function(){
        return {
            isLogin : true
        };
    },
    render : function(){
        console.log(this.state);
        return (
        <div className = "login-page">
            {
                (this.state.isLogin)?(<div className="signin">
                    <div className="form">
                        <div className ="userName">
                            <input type = "text" placeholder = "username"/>
                        </div>
                        <div className = "password">
                            <input type = "password" placeholder = "password"/>
                        </div>
                        <div className = "action-button">
                            <button className="submit"> LOGIN </button>
                        </div>
                        <div className = "toggle-logon">
                            <span>Not registered?</span> <span className="toggle" onClick={this.toggleLogOn}>Create an account</span>
                        </div>
                    </div>
                </div>):(<div className="signin">
                    <div className="form">
                        <div className ="name">
                            <input type = "text" placeholder = "name"/>
                        </div>
                        <div className = "password">
                            <input type = "password" placeholder = "password"/>
                        </div>
                        <div className ="email">
                            <input type = "text" placeholder = "email address"/>
                        </div>
                        <div className = "action-button">
                            <button className="submit"> CREATE </button>
                        </div>
                        <div className = "toggle-logon">
                            <span>Already registered?</span> <span className="toggle" onClick={this.toggleLogOn}>Sign In</span>
                        </div>
                    </div>
                </div>)
            }
        </div>
        );
    },

    toggleLogOn : function(event){
        event.stopPropagation();
        this.state.isLogin = !this.state.isLogin;
        this.setState({});
    }
});

module.exports = App;