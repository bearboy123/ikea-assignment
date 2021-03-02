import React from 'react';
import { Table, Menu, Icon, Button } from 'semantic-ui-react';

type Props ={
    page?: string
}

type State = {
    apiResponse:any
 }
export class ProductList extends React.Component<Props,State>{
    state:State;
    constructor(props: Props) {
        super(props);
        this.state = {
            apiResponse:{}
        };
    }
    callAPI() {
        fetch("http://localhost:3003/products")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    componentWillMount() {
        this.callAPI();
    }
    render(){

        return (
            <div>

  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>Articles</Table.HeaderCell>
        <Table.HeaderCell>Stock</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
        Dining Chair
        </Table.Cell>
        <Table.Cell>Leg,Screw,Seat</Table.Cell>
        <Table.Cell>4</Table.Cell>
        <Table.Cell><Button primary>Remove</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Dinning Table</Table.Cell>
        <Table.Cell>Leg,Screw, Table top</Table.Cell>
        <Table.Cell>1</Table.Cell>
        <Table.Cell><Button primary>Remove</Button></Table.Cell>
      </Table.Row>
   
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='4'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
     
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
                <p className="App-intro">{JSON.stringify(this.state.apiResponse)}</p>
            </div>
        );
    }
}