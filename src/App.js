import React from "react";
import {AmplifyTheme, Authenticator} from "aws-amplify-react"
import "./App.css";


class App extends React.Component {
    state = {
        user: null
    };

    compnentDidMount() {

    }

    render() {
        const { user } = this.state;

        return !user ? (
            <Authenticator theme={(theme)} />
        ) :
        )
        return <div>App</div>;
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
