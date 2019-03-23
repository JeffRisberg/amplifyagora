import React from "react";
import {Button, Dialog, Form, Input} from 'element-react'

class NewMarket extends React.Component {
    state = {
        name: "",
        addMarketDialog: true
    };

    handleAddMarket = () => {
        console.log(this.state.name);
        this.setState({addMarketDialog: false});
    };

    render() {
        return (
            <>
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
                                <Input placeholder="Market Name" trim="true"
                                       onChange={name => this.setState({name})}/>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button onClick={() => this.setState({addMarketDialog: false})}>
                            Cancel
                        </Button>
                        <Button type="primary"
                                disabled={!this.state.name}
                                onClick={this.handleAddMarket}>
                            Add
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </>
        );
    }
}

export default NewMarket;
