import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

function FillExample() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <LinkContainer className="bc"to="/adminhome">
                    <Nav.Link eventKey="/home">Admin Home</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            
            <Nav.Item>
                <LinkContainer to="/userlist">
                    <Nav.Link eventKey="link-2">User management</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            
        </Nav>
    );
}

export default FillExample;
