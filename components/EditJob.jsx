import React from 'react';
import JobService from '../service/JobService';
import { FormGroup, FormControl, Form, Col, ControlLabel, Button, Panel } from 'react-bootstrap/lib';

class EditJob extends React.Component {
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
        this.updateJob = this.updateJob.bind(this);
    }
    componentDidMount() {
        JobService.retrieveJob(this.props.match.params.id)
            .then(resp => {
                this.setState({
                    title: resp.data.title,
                    skills: resp.data.skills,
                    company: resp.data.Company
                });
            }).catch(err => {
                console.log(err);
            })
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

    updateJob(e) {
        e.preventDefault();
        const obj = {
            title: this.state.title,
            skills: this.state.skills,
            Company: this.state.company
        };
        JobService.updateJob(this.props.match.params.id,obj)
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
                    <Panel.Title componentClass="h3" className="text-center">Edit Job</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal id="form1" onSubmit={this.updateJob}>

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
                                <Button type="submit" className="btn btn-primary" name="button">Update Job</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }
}
export default EditJob;
