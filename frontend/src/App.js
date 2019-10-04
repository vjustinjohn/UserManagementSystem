import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class App extends Component {

  componentDidMount(){
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Welcome!</h1>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App