import React, {Component} from 'react';
import ListContacts from './ListContacts';
import * as ContactAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import {Route} from 'react-router-dom';
class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactAPI.getAll().then((contacts) => {
      this.setState({contacts})
    })
  }
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }));
    ContactAPI.remove(contact)
  }

  render() {
    return (<>
      <Route exact path="/" render={() => (
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
      )} />
      <Route path="/create" component={CreateContact} />

    </>)
  }
}

export default App;
