import React from "react";
import { Card as CardBoot } from "react-bootstrap";

const Card = (prop) => {
    return(
    <CardBoot className={prop.className}>
        <CardBoot.Body>
            <CardBoot.Title>{prop.title}</CardBoot.Title>
            <CardBoot.Text>
                {prop.children}
            </CardBoot.Text>
        </CardBoot.Body>
    </CardBoot>
    );
}

export default Card;