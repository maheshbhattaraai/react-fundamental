import sortBy from 'sort-by';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import React, {Component} from 'react'
import escapeRegexp from 'escape-string-regexp';

// function ListContacts(props) {
//     return <>
//         <ol className='contact-list'>
//             {
//                 props.contacts.map((contact) => {
//                     return <li key={contact.id} className="contact-list-item">
//                         <div className="contact-avatar" style={{
//                             backgroundImage: `url(${contact.avatarURL})`
//                         }}></div>
//                         <div className='contact-details'>
//                             <p>{contact.name}</p>
//                             <p>{contact.email}</p>
//                         </div>
//                         <button onClick={() => props.onDeleteContact(contact)} className="contact-remove">
//                             Remove
//                         </button>
//                     </li>
//                 })
//             }

//         </ol>
//     </>
// }
// ListContacts.propTypes = {
//     contacts: PropTypes.array.isRequired,
//     onDeleteContact: PropTypes.func.isRequired
// }
class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: "",
    }
    updateQuery = value => {
        this.setState({
            query: value.trim()
        });
    }
    clearQuery = () => {
        this.setState({
            query: ''
        });
    }
    render() {
        const {contacts, onDeleteContact} = this.props
        const {query} = this.state
        let showingContacts
        if (query) {
            const match = new RegExp(escapeRegexp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = contacts
        }
        showingContacts.sort(sortBy('name'))
        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input className="search-contacts" type="text" placeholder="Search Contacts" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                    <Link to="/create" className="add-contact">Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now Showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {
                        showingContacts.map((contact) => {
                            return <li key={contact.id} className="contact-list-item">
                                <div className="contact-avatar" style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}></div>
                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick={() => onDeleteContact(contact)} className="contact-remove">
                                    Remove
                                </button>
                            </li>
                        })
                    }
                </ol>
            </div>
        )
    }
}
export default ListContacts;