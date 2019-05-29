import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap/lib';
import JobService from '../service/JobService';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
class JobDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            jobs: [],
            response: {},
        }
        this.refreshJob = this.refreshJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }
    componentWillMount() {
        this.refreshJob();
    }
    deleteJob(jobId) {
        JobService.deleteJob(jobId)
            .then(response => {
                if (response.status === 204) response.message = 'Successfully deleted';
                this.refreshJob();
            }).catch(err => {

            });
    }

    refreshJob() {
        JobService.retrieveAllJob()
            .then(
                response => {
                    this.setState({ jobs: response.data })
                }
            ).catch(err => {
                this.setState({ error });
            });
    }
    render() {
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
              Showing { from } to { to } of { size } Results
            </span>
          );
        const options = {
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
              text: '5', value: 5
            }]
          };
        const columns = [
            {
                dataField: '_id',
                isDummyField: true,
                text: '#',
                sort: true,
                formatter: (cellContent, row) => {
                    return (
                       row._id
                    );
    
                }
            },{
            dataField: 'title',
            text: 'Title',
            sort: true
        }, {
            dataField: 'skills',
            text: 'Skills',
            sort: true
        }, {
            dataField: 'Company',
            text: 'Company',
            sort: true
        },
        {
            dataField: 'edit-delete',
            isDummyField: true,
            text: 'Edit/Delete',
            formatter: (cellContent, row) => {
                return (
                    <span>
                        <Link to={"edit/" + row._id} className="btn btn-primary">Edit</Link>
                        &nbsp;<Button variant="danger" size="sm" onClick={() => this.deleteJob(row._id)}>Delete</Button></span>
                );

            }
        }
        ];
        return (
            <BootstrapTable keyField='_id' data={this.state.jobs} columns={columns} pagination={paginationFactory(options)} />  
        );
    }
}

export default JobDetails;