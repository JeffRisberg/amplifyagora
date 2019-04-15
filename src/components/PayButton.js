import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { createOrder } from "../graphql/mutations";
import StripeCheckout from "react-stripe-checkout";
import { Notification, Message } from "element-react";
import { history } from "../App";

const stripeConfig = {
    currency: "USD",
    publishableAPIKey: "pk_test_RItAnRIm3Ah5bpEjFOHBZrjm00zS2Qeacy"
};

const PayButton = ({ product, userAttributes }) => {
    const getOwnerEmail = async ownerId => {
        try {
            const input = { id: ownerId };
            const result = await API.graphql(graphqlOperation(getUser, input));
            return result.data.getUser.email;
        } catch (err) {
            console.error(`Error fetching product owner's email`, err);
        }
    };

    const createShippingAddress = source => ({
        city: source.address_city,
        country: source.address_country,
        address_line1: source.address_line1,
        address_state: source.address_state,
        address_zip: source.address_zip
    });

    const handleCharge = async token => {
        try {
            const ownerEmail = await getOwnerEmail(product.owner);
            console.log({ ownerEmail });
            const result = await API.post("orderlambda", "/charge", {
                body: {
                    token
                }
            });
            console.log({ result });
        } catch (err) {
            console.error(err);
            Notification.error({
                title: "Error",
                message: `${err.message || "Error processing order"}`
            });
        }
    };

    return (
        <StripeCheckout
            token={handleCharge}
            email={userAttributes.email}
            name={product.description}
            amount={product.price}
            currency={stripeConfig.currency}
            stripeKey={stripeConfig.publishableAPIKey}
            shippingAddress={product.shipped}
            billingAddress={product.shipped}
            locale="auto"
            allowRememberMe={false}
        />
    );
};

export default PayButton;
