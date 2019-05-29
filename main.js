
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import { Grid, Navbar, Col } from 'react-bootstrap/lib';
import JobDetails from './components/JobDetails.jsx';
import JobForm from './components/JobForm.jsx';
import Header from './components/header.jsx'
import EditJob from './components/EditJob.jsx'
ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Grid>
                <Col sm={12}>
                    <Route exact path="/" component={JobDetails} />
                    <Route  path="/add" component={JobForm} />
                    <Route  path="/edit/:id" component={EditJob} />
                </Col>
            </Grid>
            <Navbar fixedBottom >
                <Grid>
                    <div className='text-center'>
                        <h5>Copyright &#169; UI & Markup Team ,Infosys Limited</h5>
                    </div>
                </Grid>
            </Navbar>
        </div>
    </Router>
    ,
    document.getElementById('app'));
