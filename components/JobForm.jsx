import React from 'react';
import JobService from '../service/JobService';
import { FormGroup, FormControl, Form, Col, ControlLabel, Button, Panel } from 'react-bootstrap/lib';

class JobForm extends React.Component {
    constructor(props, ) {
        super(props);
        this.state = {
            title: '',
            skills: '',
            company: ''
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeSkills(e) {
        this.setState({
            skills: e.target.value
        })
    }
    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }

    contactSubmit(e) {
        e.preventDefault();
        const obj = {
            title: this.state.title,
            skills: this.state.skills,
            Company: this.state.company
        };
        JobService.createJob(obj)
            .then(
                response => {
                    this.props.history.push('/');
                }
            );
            
    }

    render() {
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3" className="text-center">Create Job</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal id="form1" onSubmit={this.contactSubmit.bind(this)}>

                        <FormGroup controlId="title">
                            <Col componentClass={ControlLabel} sm={3}>
                                Job Title
</Col>
                            <Col sm={9}>
                                <FormControl type="text" placeholder="Title" value={this.state.title} onChange={this.onChangeTitle} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="skills">
                            <Col componentClass={ControlLabel} sm={3}>
                                Skills
</Col>
                            <Col sm={9}>
                                <FormControl type="text" placeholder="Skills" value={this.state.skills} onChange={this.onChangeSkills} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="company">
                            <Col componentClass={ControlLabel} sm={3}>
                                Company
</Col>
                            <Col sm={9}>
                                <FormControl type="text" placeholder="Enter Company" value={this.state.company} onChange={this.onChangeCompany} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={12}>
                                <Button type="submit" className="btn btn-primary" name="button">Create Job</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }
}
export default JobForm;
