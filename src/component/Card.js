import React from "react";
import { Card } from "react-bootstrap";

const card = (prop) => {
    return(
    <Card className={prop.className}>
        <Card.Body>
            <Card.Title>{prop.title}</Card.Title>
            <Card.Text>
                {prop.children}
            </Card.Text>
        </Card.Body>
    </Card>
    );
}

export default card;