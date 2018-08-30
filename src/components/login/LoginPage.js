var React = require("react");
var LoginAPI = require("../../api/LoginAPI");

var LoginPage = React.createClass({
    getInitialState : function(){
        return {
            isLogin : true
        };
    },
    render : function(){        
        return (
        <div className="page-wrap">
            <div className = "login-page">
                {
                    (this.state.isLogin)?(<div className="signin">
                        <div className="form">
                            {(this.state.newUseradded)?(<div className="user-added">Successfully Created. Please, Sign IN</div>):""}
                            {(this.props.user.error)?(<div className="error">{this.props.user.error}</div>):""}
                            <input type = "text" placeholder = "Username" ref="username"/>
                            <input type = "password" placeholder = "Password" ref="password" />
                            <button className="submit" onClick={this.validateLogin}> LOGIN </button>
                            <div className = "toggle-logon">
                                <span>Not registered?</span> <span className="toggle" onClick={this.toggleLogOn}>Create an account</span>
                            </div>
                        </div>
                    </div>):(<div className="signin">
                        <div className="form">
                            {(this.props.user.error)?(<div className="error">{this.props.user.error}</div>):""}
                            <input type = "text" placeholder = "Username" ref= "username" />
                            <input type = "text" placeholder = "First Name" ref= "fname" />
                            <input type = "text" placeholder = "Last Name" ref= "lname" />
                            <input type = "text" placeholder = "Email" ref= "email" />
                            <input type = "password" placeholder = "Password" ref= "password" />
                            <input type = "text" placeholder = "Key (*Contact Admin)" ref= "key" />
                            <button className="submit" onClick={this.createNewUser}> CREATE </button>
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

    clearInputs : function () {
        if(this.refs.fname) this.refs.fname.value= "";
        if(this.refs.lname) this.refs.lname.value = "";
        if(this.refs.email) this.refs.email.value = "";
        if(this.refs.username) this.refs.username.value = "";
        if(this.refs.password) this.refs.password.value = "";
        if(this.refs.key) this.refs.key.value = "";
    },

    toggleLogOn : function(event){
        event.stopPropagation();
        this.clearInputs();
        this.props.toggleSignOn();
        this.state.isLogin = !this.state.isLogin;
    },
    validateLogin : function (event){
        event.stopPropagation();
        if(this.refs.username.value && this.refs.password.value){
            var param = {
                user_name : this.refs.username.value,
                password : this.refs.password.value
            }
            LoginAPI.validateLoginUser(param).done(function(data){
                this.props.userSigninSuccess(data[0]);
            }.bind(this)).fail(function(err){
                console.log("ERROR in validating login user", err.responseJSON);
                this.props.userSigninFailure(err.responseJSON.reason);
            }.bind(this));
        }
    },

    createNewUser : function(event){
        event.stopPropagation();
        if(this.refs.fname.value && this.refs.lname.value && this.refs.email.value && this.refs.username.value && this.refs.password.value && this.refs.key.value){
            var param = {
                first_name : this.refs.fname.value,
                last_name : this.refs.lname.value,
                user_name : this.refs.username.value,
                email : this.refs.email.value,
                password : this.refs.password.value,
                key : (this.refs.key.value).toLowerCase()
            };
            LoginAPI.addUserwithLogOn(param).done(function(){
                this.state.isLogin = !this.state.isLogin;
                this.state.newUseradded = true;
                this.clearInputs();
                this.props.userSignonSuccess();
            }.bind(this)).fail(function(err){
                this.props.userSignonFailure(err.responseJSON.reason);
            }.bind(this));
        }
    }
});

module.exports = LoginPage;