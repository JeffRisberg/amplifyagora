import React from "react";
import {S3Image} from "aws-amplify-react";
// prettier-ignore
import {Card} from "element-react";
import {convertCentsToDollars} from "../utils";
import {UserContext} from "../App";
import PayButton from "./PayButton";

class Product extends React.Component {
    state = {
        description: "",
        price: "",
        shipped: false,
        updateProductDialog: false,
        deleteProductDialog: false
    };

    render() {
        const {
            updateProductDialog,
            deleteProductDialog,
            description,
            shipped,
            price
        } = this.state;
        const {product} = this.props;

        return (
            <UserContext.Consumer>
                {({userAttributes}) => {
                    const isProductOwner =
                        userAttributes && userAttributes.sub === product.owner;
                    const isEmailVerified =
                        userAttributes && userAttributes.email_verified;

                    return (
                        <div className="card-container">
                            <Card bodyStyle={{padding: 0, minWidth: "200px"}}>
                                <S3Image
                                    imgKey={product.file.key}
                                    theme={{
                                        photoImg: {maxWidth: "100%", maxHeight: "100%"}
                                    }}
                                />
                                <div className="card-body">
                                    <h3 className="m-0">{product.description}</h3>
                                    <div className="items-center">
                                        <img
                                            src={`https://icon.now.sh/${
                                                product.shipped ? "markunread_mailbox" : "mail"
                                                }`}
                                            alt="Shipping Icon"
                                            className="icon"
                                        />
                                        {product.shipped ? "Shipped" : "Emailed"}
                                    </div>
                                    <div className="text-right">
                    <span className="mx-1">
                      ${convertCentsToDollars(product.price)}
                    </span>
                                        !isProductOwner && (
                                        <PayButton
                                            product={product}
                                            userAttributes={userAttributes}
                                        />
                                        )
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                }}
            </UserContext.Consumer>
        );
    }
}

export default Product;
