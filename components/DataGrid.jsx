import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap/lib';
import JobService from '../service/JobService';
import { Link } from 'react-router-dom';

class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            totalSize: 0,
            page: 1,
            sizePerPage: 5,
        };
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {
        let limit = page;
        if (limit > 1) { limit = (limit - 1) * sizePerPage }
        else limit = 0;
        JobService.retrieveCount().then(count => {
            JobService.retrieveJobByIndex(sizePerPage, limit).then(data => {
                this.setState({ items: data.data, totalSize: count.count, page, sizePerPage });
            });
        })
    }

    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage);
    }

    render() {
        // const options = {
        //     onPageChange: this.handlePageChange,
        //     onSizePerPageList: this.handleSizePerPageChange,
        //     page: this.state.page,
        //     sizePerPage: this.state.sizePerPage,
        // };
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
            }, {
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
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                Showing {from} to {to} of {size} Results
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
                text: '2', value: 2
            }],
            onPageChange:this.handlePageChange
        };

        return (
            <BootstrapTable keyField='_id'
                data={this.state.items}
                columns={columns}
                fetchInfo={{ dataTotalSize: this.state.totalSize }}
                pagination={paginationFactory(options)}
                remote
            /> 
        );
    }
}

export default DataGrid;