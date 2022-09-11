import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../Theme.scss';

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="main-background">
                <div className="backgorund-card"/>
                <div className="logo">
                    Orderaholic
                </div>
                <div className="main">
                    <div className="JoinUs">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Corfirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Corfirm Password" />
                            </Form.Group>
                            <Button variant="secondary">
                                Sign Up
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectLoginPage;