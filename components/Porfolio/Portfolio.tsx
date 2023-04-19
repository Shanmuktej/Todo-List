import React from 'react'
import { Col, Container } from 'react-bootstrap'
import { useState } from 'react';
import { AppsType } from '../AppContainer';


const Portfolio = () => {
    const [app, setApp] = useState<AppsType>("Portfolio")
    return (
        <Container className="row m-0 p-0" fluid style={{ width: "-webkit-fill-available" }} >
            <Col className={app === "Portfolio" ? "welcomeContainer" : "onActiveApp"} onClick={() => setApp("Todos")}>
                hi
            </Col>
        </Container>
    )
}

export default Portfolio