import React from 'react';
import { Button } from 'react-bootstrap/lib';
import JobService from '../service/JobService';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
let skip = 0;
const columns = [
  {
    dataField: '_id',
    isDummyField: true,
    text: '#',
    sort: true,
    formatter: (cellContent, row, i) => {
      return (
        row._id
      );
    }
  }, {
    dataField: 'title',
    text: 'Title',
    sort: true,
    // filter: textFilter()
  }, {
    dataField: 'skills',
    text: 'Skills',
    sort: true,
    // filter: textFilter()
  }, {
    dataField: 'Company',
    text: 'Company',
    sort: true,
    // filter: textFilter()
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
const RemoteSort = ({ data, page, sizePerPage, onTableChange, totalSize }) => (<div>
  <BootstrapTable
    remote
    keyField="_id"
    data={data}
    columns={columns}
    // filter={filterFactory()}
    pagination={paginationFactory({ page, sizePerPage, totalSize })}
    onTableChange={onTableChange} />
</div>);

class JobDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      sizePerPage: 5,
      total: 0
    };
    this.refreshJob = this.refreshJob.bind(this);
    this.countJob = this.countJob.bind(this);
  }
  componentDidMount() {
    this.refreshJob();
    this.countJob();
  }
  countJob() {
    JobService.retrieveCount().then(resp => {
      this.setState({
        total: resp.data.count
      })
    }).catch(err => {
      console.log(err)
    })
  }
  refreshJob() {
    JobService.retrieveJobByIndex(this.state.sizePerPage, skip)
      .then(
        response => {
          this.setState({ data: response.data })
        }
      ).catch(err => {
        this.setState({ error });
      });
  }

  handleTableChange = (type, { sortField, sortOrder, data, filters, page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    if (page > 1) skip = currentIndex
    else skip = 0;
    switch (type) {
      case 'filter':
        var searchField = Object.keys(filters);
        const { filterVal, filterType } = filters[searchField];
        JobService.retrieveJobBySearch(searchField, filterVal).then(resp => {
          console.log(resp.data)
        }).catch(err => {
          console.log(err);
        })
        break;
      case 'sort':
        JobService.retrieveSort(sortField, sortOrder, sizePerPage).then(result => {
          this.setState(() => ({
            data: result.data
          }));
        }).catch(err => {
          console.log(err);
        })
        break;
      case 'pagination':
        JobService.retrieveJobByIndex(sizePerPage, skip, sortField, sortOrder).then(resp => {
          this.setState(() => ({
            page,
            data: resp.data,
            sizePerPage
          }));
        })
        break;
      default:
        break;
    }
  }
  render() {
    const { data, sizePerPage, page, total } = this.state;
    return (
      <RemoteSort
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={total}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default JobDetails;