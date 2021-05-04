import Table from "react-bootstrap/Table";

let dataView = (props) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Category</th>
          <th>Sub-category</th>
          <th>Two</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Men</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Women</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default dataView;
