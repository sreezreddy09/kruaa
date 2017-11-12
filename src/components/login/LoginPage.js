var React = require("react");

var LoginPage = React.createClass({
    getInitialState : function(){
        return {
            isLogin : true
        };
    },
    render : function(){
        console.log(this.state);
        return (
        <div className="page-wrap">
            <div className = "login-page">
                {
                    (this.state.isLogin)?(<div className="signin">
                        <div className="form">
                            <input type = "text" placeholder = "username" ref="username"/>
                            <input type = "password" placeholder = "password" ref="password"/>
                            <button className="submit" onClick={this.validateLogin}> LOGIN </button>
                            <div className = "toggle-logon">
                                <span>Not registered?</span> <span className="toggle" onClick={this.toggleLogOn}>Create an account</span>
                            </div>
                        </div>
                    </div>):(<div className="signin">
                        <div className="form">
                            <input type = "text" placeholder = "name"/>
                            <input type = "password" placeholder = "password"/>
                            <input type = "text" placeholder = "email address"/>
                            <button className="submit"> CREATE </button>
                            <div className = "toggle-logon">
                                <span>Already registered?</span> <span className="toggle" onClick={this.toggleLogOn}>Sign In</span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
        );
    },

    toggleLogOn : function(event){
        event.stopPropagation();
        this.state.isLogin = !this.state.isLogin;
        this.setState({});
    },
    validateLogin : function (event){
        event.stopPropagation();
        if(this.refs.username.value == "sreez" && this.refs.password.value == "reddy"){
            this.props.history.push('/dashboard');
        }
    }
});

module.exports = LoginPage;