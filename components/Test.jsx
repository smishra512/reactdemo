import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// ...
const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={columns}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
    />
  </div>
);

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      sizePerPage: 10
    };
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 2000);
  }

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemotePagination
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={products.length}
        onTableChange={this.handleTableChange}
      />
    );
  }
}
export default Test;