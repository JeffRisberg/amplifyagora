import React from "react";
import {Auth, Hub} from "aws-amplify";
import {AmplifyTheme, Authenticator} from "aws-amplify-react"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import MarketPage from "./pages/MarketPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";


class App extends React.Component {
    state = {
        user: null
    };

    componentDidMount() {
        console.dir(AmplifyTheme);
        this.getUserData();
        Hub.listen('auth', this, 'onHubCapsule');
    };

    getUserData = async () => {
        const user = await Auth.currentAuthenticatedUser();
        user ? this.setState({user}) : this.setState({user: null})
    };

    onHubCapsule = capsule => {
        switch (capsule.payload.event) {
            case "signIn":
                console.log("signed in");
                this.getUserData();
                break;
            case "signUp":
                console.log("signed up");
                break;
            case "signOut":
                console.log("sign out");
                break;
            default:
                return;
        }
    };

    render() {
        const {user} = this.state;

        return !user ?
            <Authenticator theme={(theme)}/> : (
                <Router>
                    <React.Fragment>
                        {/* routes */}
                        <div className="appContainer">
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/markets/:marketId" component={
                                ({match}) => <MarketPage marketId={match.params.marketId}/>}/>
                            <Route path="/profile" component={ProfilePage}/>
                        </div>
                    </React.Fragment>
                </Router>
            );
    }
}

const theme = {
    ...AmplifyTheme,
    navBar: {
        ...AmplifyTheme.navBar,
        backgroundColor: '#ffc0cb'
    },
    button: {
        ...AmplifyTheme.button,
        backgroundColor: 'var(--amazonOrange)'
    },
    sectionBody: {
        ...AmplifyTheme.sectionBody,
        padding: '5px',
    },
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgroundColor: 'var(--squidInk)'
    }
};

//export default withAuthenticator(App, true, [], null, theme);
export default App;
