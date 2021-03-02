import React from 'react';
import { Table, Menu, Icon, Button } from 'semantic-ui-react';
import StockDto from '../../dtos/stock.dto';

type Props ={
    page?: string
}

type State = {
    apiResponse?:Array<StockDto>
 }
export class ProductList extends React.Component<Props,State>{
    state:State;
    constructor(props: Props) {
        super(props);
        this.state = {
            apiResponse:[]
        };
    }
    callAPI() {
        fetch("http://localhost:3003/products")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: JSON.parse(res) }));
    }
    componentWillMount() {
        this.callAPI();
    }
    renderItems() {
      const data = this.state.apiResponse
      console.log(data)
      return data?.map((item) => <Table.Row>
      <Table.Cell>
      {item.product.name}
      </Table.Cell>
      <Table.Cell>{item.product.contains.map(x => x.article.name).join(",")}</Table.Cell>
      <Table.Cell>{item.amount}</Table.Cell>
      <Table.Cell><Button primary>Remove 1 item</Button></Table.Cell>
    </Table.Row>)
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
     {this.renderItems()}
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
            </div>
        );
    }
}