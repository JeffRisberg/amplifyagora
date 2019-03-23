import React from "react";
import {Button, Dialog, Form, Input, Notification} from 'element-react'
import {API, graphqlOperation} from 'aws-amplify';
import {createMarket} from '../graphql/mutations';
import {UserContext} from '../App.js';

class NewMarket extends React.Component {
    state = {
        name: "",
        addMarketDialog: false
    };

    handleAddMarket = async (user) => {
        try {
            this.setState({addMarketDialog: false});
            const input = {
                name: this.state.name,
                owner: user.username
            };
            const result = await API.graphql(graphqlOperation(createMarket, {input}));
            console.info(`Created market: id ${result.data.createMarket.id}`);
            this.setState({name: ""});
        } catch (err) {
            console.error("Error adding new market", err);
            Notification.error({
                title: "Error",
                message: `${err.message || "Error adding market"}`
            })
        }
    };

    render() {
        return (
            <UserContext.Consumer>
                {({user}) => <>
                    <div className="market-header">
                        <h1 className="market-title">
                            Create Your MarketPlace
                            <Button type="text" icon="edit" className="market-title-button"
                                    onClick={() => this.setState({addMarketDialog: true})}/>
                        </h1>
                    </div>

                    <Dialog title="Create New Market" visible={this.state.addMarketDialog}
                            onCancel={() => this.setState({addMarketDialog: false})}
                            size="large"
                            customClass="dialog">
                        <Dialog.Body>
                            <Form labelPosition="top">
                                <Form.Item label="Add Market Name">
                                    <Input placeholder="Market Name" trim={true}
                                           onChange={name => this.setState({name})}
                                           value={this.state.name}/>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => this.setState({addMarketDialog: false})}>
                                Cancel
                            </Button>
                            <Button type="primary"
                                    disabled={!this.state.name}
                                    onClick={() => this.handleAddMarket(user)}>
                                Add
                            </Button>
                        </Dialog.Footer>
                    </Dialog>
                </>
                }
            </UserContext.Consumer>
        );
    }
}

export default NewMarket;
