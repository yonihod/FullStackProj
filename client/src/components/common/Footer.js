import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


export default class Footer extends Component {

    render() {
        return (
          <footer className={"footer bg-dark w-100 p-4"}>
              © Developi
          </footer>
        );
    }
}